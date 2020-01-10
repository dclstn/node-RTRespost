// filesys.js

// Import modules
const fs      = require('fs')
const https   = require('https');
const Stream  = require('stream').Transform

exports.alreadyTweeted = function(submission){
    let rawdata = fs.readFileSync('tweeted.json');
    let tweets = JSON.parse(rawdata);
    if(tweets.includes(submission.id)) return true
    else return false
}

exports.addThread = function(submission){
    let rawdata = fs.readFileSync('tweeted.json');
    let tweets = JSON.parse(rawdata)
    tweets.push(submission.id)
    fs.writeFileSync('tweeted.json', JSON.stringify(tweets));
}

exports.saveImage = function(submission){
    return new Promise(function(resolve, reject){
        var url = submission.url;
        var ext = (submission.url.split('.')).slice(-1)[0] 

        https.request(url, function(response) {  
            var data = new Stream();                                                    
            response.on('data', function(chunk) {                                       
                data.push(chunk);                                                         
            });                                                                         
            response.on('end', function() {                                             
                fs.writeFileSync(`./temp/temp.${ext}`, data.read());     
                resolve()                          
            });             
        }).end();
    })
}