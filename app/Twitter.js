module.exports = function (io) {
	var exports = {};
	var Twitter = require('node-tweet-stream');

	var t = new Twitter({
	    consumer_key: 		process.env.TWITTER_CON_KEY,
	    consumer_secret: 	process.env.TWITTER_CON_SECRET,
	    token: 				process.env.TWITTER_TOK_KEY,
	    token_secret: 		process.env.TWITTER_TOK_SECRET
	});


	t.on('error', function (err) {
		console.log("Error Fetching Tweets");
	})

	return exports;
};
