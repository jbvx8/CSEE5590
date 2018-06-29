var Twitter = require('twitter');
var express = require('express');
var cors = require('cors');
var app = express();

// set a new Twitter client using the twitter module.  Credentials are stored as environment variables.
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    bearer_token: process.env.TWITTER_BEARER_TOKEN
});

app.use(cors());

// uses the twitter client to send the request to the twitter API.  The response is sent with the list of friends
// returned
app.get('/getFriends/:screenName', function (req, res) {
    client.get('friends/list', { screen_name: req.params.screenName, count: 10 }, function(error, list, response) {
        if (error) throw error;
        res.send(JSON.stringify(list.users));
    });
});

// creates a node js server
var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Twitter app listening at http://%s:%s", host, port)
});