// tweet.js

const filesys = require('./filesys.js')
const fs      = require('fs');

exports.posttweet = function(client, submission) {

    return new Promise(async function(resolve, reject){

        if(submission.url.includes('.png')){
            await filesys.saveImage(submission).then(function(){
                var data = fs.readFileSync('./temp/temp.png');
                client.post('media/upload', {media: data}, function(error, media, response) {
    
                    var status = {
                        status: `${submission.title} - redd.it/${submission.id}`,
                        media_ids: media.media_id_string
                    }
    
                    client.post('statuses/update', status, function(error, tweet, response) {
                        if (!error) {
                            resolve()
                        }
                    });
                })  
            })

        } else if(submission.url.includes('.jpg')){
            await filesys.saveImage(submission).then(function(){
                var data = fs.readFileSync('./temp/temp.jpg');
                client.post('media/upload', {media: data}, function(error, media, response) {
    
                    var status = {
                        status: `${submission.title} - redd.it/${submission.id}`,
                        media_ids: media.media_id_string
                    }
    
                    client.post('statuses/update', status, function(error, tweet, response) {
                        if (!error) {
                            resolve()
                    }
                });
            })  
        })

        } else {

            var status = {
                status: `${submission.title} - ${submission.url} - redd.it/${submission.id}`,
            }

            client.post('statuses/update', status, function(error, tweet, response) {
                if (!error) {
                    resolve()
                }
            });
        }
    })   
}
     

