require("dotenv").config();
var fs= require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spo");
var Twitter = require('twitter');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var wordArr= process.argv;
var action = wordArr[2];


switch (action) {
    case "my-tweets":
      tweets();
      break;
    
    case "spotify-this-song":
      song();
      break;
    
    case "movie-this":
      movie();
      break;
    
    case "do-what-it-says":
      read();
      break;
    }

    function tweets(){
        var params = {screen_name: "theguyfromtv",
                    count: 20,
                    trim_user:true
                    };
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {

            for (j=0; j<19; j++){

                console.log(tweets[j].created_at);
                console.log(tweets[j].text)

            }
                    }
        })
    }

    function song (){

        var track="";

        for(var i=3; i<wordArr.length; i++){

            track = track+" "+wordArr[i];

        }

 

        spotify.search({ type: 'track', query: track }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
           
          console.log(data); 
          });
          

    }
