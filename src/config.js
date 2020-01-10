// config.js
require('dotenv').config()

module.exports = {

    twitter: {
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.ACCESS_TOKEN_KEY,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
    },

    reddit: {
        userAgent: process.env.USERAGENT,
        clientId: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET,
        refreshToken: process.env.REFRESHTOKEN
    }, 

    search: {
        subreddit: 'OverwatchTMZ',
        minups: 20,
        limit: 20,
        cooldown: 60000
    },

    query: {
        q: 'overwatch', 
        count: 30, 
        result_type: 'recent', 
        lang: 'en'
    },

    cooldown: {
        redditcooldown: 60000,
        autolikecooldown: 3600000
    }
}
