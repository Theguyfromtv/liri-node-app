require("dotenv").config();
var fs= require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var Twitter = require('twitter');
var request = require("request");

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
    function read(){

        fs.readFile("random.txt", "utf8", function(error, data) {
    
            if (error) {
              return console.log(error);
            }
          
            console.log(data);

            wordArr=data.split(",")

            wordArr.splice(0,0,"node","liri.js");

            action=wordArr[2]
            
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

            if (i > 3 && i < wordArr.length) {

                track = track + "+" + wordArr[i];
            
              }
            
              else {
            
                track += wordArr[i];
            
        }

 

        spotify.search({ type: 'track', query: track }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
           
          console.log(data.items[0]); 
          });
          

    }
}

  function movie(){

    var movieName = "";

    for (var i = 3; i < wordArr.length; i++) {

        if (i > 3 && i < wordArr.length) {

        movieName = movieName + "+" + wordArr[i];

        }

        else {

        movieName += wordArr[i];

        }
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";


    request(queryUrl, function(error, response, body) {

        if (!error && response.statusCode === 200) {

            console.log(JSON.parse(body).Title);
            console.log(JSON.parse(body).Year);
            console.log(JSON.parse(body).Ratings[0].Source+": ",JSON.parse(body).Ratings[0].Value);
            console.log(JSON.parse(body).Ratings[1].Source+": ",JSON.parse(body).Ratings[0].Value);
            console.log(JSON.parse(body).Country);
            console.log(JSON.parse(body).Language);
            console.log(JSON.parse(body).Plot);
            console.log(JSON.parse(body).Actors);

        }
    });

}



})
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

        if (i > 3 && i < wordArr.length) {

            track = track + "+" + wordArr[i];
        
          }
        
          else {
        
            track += wordArr[i];
        
    }



    spotify.search({ type: 'track', query: track }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data); 
      });
      

}
}

function movie(){

var movieName = "";

for (var i = 3; i < wordArr.length; i++) {

    if (i > 3 && i < wordArr.length) {

    movieName = movieName + "+" + wordArr[i];

    }

    else {

    movieName += wordArr[i];

    }
}

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";


request(queryUrl, function(error, response, body) {

    if (!error && response.statusCode === 200) {

        console.log(JSON.parse(body).Title);
        console.log(JSON.parse(body).Year);
        console.log(JSON.parse(body).Ratings[0].Source+": ",JSON.parse(body).Ratings[0].Value);
        console.log(JSON.parse(body).Ratings[1].Source+": ",JSON.parse(body).Ratings[0].Value);
        console.log(JSON.parse(body).Country);
        console.log(JSON.parse(body).Language);
        console.log(JSON.parse(body).Plot);
        console.log(JSON.parse(body).Actors);

    }
});

}