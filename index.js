var express = require('express');
var app = express();
var harmony = require('harmonyhubjs-client');
var harmonyip = '192.168.1.170';
var winston = require('winston');
	winston.remove(winston.transports.Console);
	winston.add(winston.transports.Console, {timestamp:false, showLevel:false});
	winston.add(winston.transports.File, {filename: 'history.log', json:false, timestamp:true, showLevel: false });


app.get('/', function (req, res) {
	res.send('Hello World!');
});

//Start TV
app.get('/WatchTV', function (req, res) { //Path set for activity in Amazon Echo Bridge Configurator
	harmony(harmonyip)
	.then(function(harmonyClient) {
		winston.info("Starting Watch TV...");
		harmonyClient.startActivity('XXXXXXXX'); // Activity ID from Harmony Hub, open Activities at IP to query Hub for all IDs
		harmonyClient.end();
	});
	res.sendStatus(200);
});

//Stop TV
app.get('/StopTV', function (req, res) {
	harmony(harmonyip)
	.then(function(harmonyClient) {
		winston.info("Turning Off...");
		harmonyClient.turnOff();
		harmonyClient.end();
	});
	res.sendStatus(200);
});

//Start Apple TV
app.get('/AppleTV', function (req, res) {
	harmony(harmonyip)
	.then(function(harmonyClient) {
		winston.info("Starting AppleTV...");
		harmonyClient.startActivity('XXXXXXXX');
		harmonyClient.end();
	});
	res.sendStatus(200);
});

//Start Firestick
app.get('/Firestick', function (req, res) {
	harmony(harmonyip)
	.then(function(harmonyClient) {
		winston.info("Starting Firestick...");
		harmonyClient.startActivity('XXXXXXXX');
		harmonyClient.end();
	});
	res.sendStatus(200);
});

//Start Xbox One
app.get('/Xbox', function (req, res) {
	harmony(harmonyip)
	.then(function(harmonyClient) {
		winston.info("Starting Xbox One...");
		harmonyClient.startActivity('XXXXXXXX');
		harmonyClient.end();
	});
	res.sendStatus(200);
});

//Start WiiU
app.get('/WiiU', function (req, res) {
	harmony(harmonyip)
	.then(function(harmonyClient) {
		winston.info("Starting Wii U...");
		harmonyClient.startActivity('XXXXXXXX');
		harmonyClient.end();
	});
	res.sendStatus(200);
});

//Start Chromecast
app.get('/Chromecast', function (req, res) {
	harmony(harmonyip)
	.then(function(harmonyClient) {
		winston.info("Starting Chromecast...");
		harmonyClient.startActivity('XXXXXXXX');
		harmonyClient.end();
	});
	res.sendStatus(200);
});

//Get list of activity ids
app.get('/Activities', function (req, res) {
	harmony(harmonyip)
	.then(function(harmonyClient) {
		harmonyClient.getActivities()
		.then(function(activities) {
			activities.some(function(activity) {
				winston.info(activity.label + ' (' + activity.id + ')');
			});
			harmonyClient.end();
		});
	});
	res.send('Check console for activity list');
});


var server = app.listen(8088, function () {
	var port = server.address().port;

	winston.info('Server running on port %s', port);
});
