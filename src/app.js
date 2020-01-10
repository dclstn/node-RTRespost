// app.js

// Import modules
const config  = require('./config.js');
const filesys = require('./filesys.js');
const tweet   = require('./tweet.js');
const twitter = require('twitter');
const reddit  = require('snoowrap');
const chalk   = require('chalk');

// Create Clients
const r = new reddit(config.reddit);
const t = new twitter(config.twitter);

// Assign Variables
const limit            = config.search.limit;
const subreddit        = config.search.subreddit;
const minups           = config.search.minups;
const redditcooldown   = config.cooldown.redditcooldown;
const autolikecooldown = config.cooldown.autolikecooldown;
const params           = config.query;

// Find new posts made on reddit then make a tweet about them
function searchPosts() {

    r.getHot(subreddit, {limit: limit}).forEach(async submission => {

        if(filesys.alreadyTweeted(submission)) return;                               // Ignore threads that are already posted
        if(submission.link_flair_text == 'Announcement') return;                     // Ignore announcement threads
        if(submission.ups < minups) return;                                          // Ignore posts under config min ups
        filesys.addThread(submission);                                               // Adds thread so it doesn't get submitted again
        await tweet.posttweet(t, submission);                                        // Make a tweet about submission
        console.log(chalk.green(`[Script] Tweeted: redd.it/${submission.id}`));      // Alert console, saying we made a tweet
        
    });
    
}

// Find the past tweets related to overwatch then like them
function autoLikeTweets() {

    t.get('search/tweets', params, function(err, data, response) {
        if (err) throw err;
        console.log(chalk.green(`[Script] Favouriting ${config.query.limit} tweets...`))
        for(let i = 0; i < data.statuses.length; i++){
            let id = {id: data.statuses[i].id_str};
            t.post('favorites/create', id, function(err, response){
                if (err) throw err;
                let username = response.user.screen_name;
                let tweetId = response.id_str;
                console.log(chalk.blue(`[Script] Favorited: https://twitter.com/${username}/status/${tweetId}`))
            })
        }
    });

}

setInterval(searchPosts, redditcooldown);
setInterval(autoLikeTweets, autolikecooldown);