var express = require('express');
var app = express();
var harmony = require('harmonyhubjs-client');
var harmonyip = '192.168.1.170';
var winston = require('winston');
	winston.remove(winston.transports.Console);
	winston.add(winston.transports.Console, {timestamp:false, showLevel:false});
	winston.add(winston.transports.File, {filename: 'history.json', json:true, timestamp:true, showLevel: true });

var HueApi = require('node-hue-api').HueApi;
var nhuelights = 3;
var hueip = '192.168.1.119';
var hueusername = '';
var hue = new HueApi(hueip,hueusername);


//Change Activity Function ID is activity ID from Harmony Hub, name is only for logging purposes
function changeActivity(name,id){
	harmony(harmonyip)
	.then(function(harmonyClient) {
		winston.info('Starting ' + name + '...');
		harmonyClient.startActivity(id).end();
	});
}


app.get('/', function (req, res) {
	res.send('Hello World!');
});

//Stop TV
app.get('/StopTV', function (req, res) {
	harmony(harmonyip)
	.then(function(harmonyClient) {
		winston.info("Turning Off...");
		harmonyClient.turnOff().end();
	});
	res.sendStatus(200);
});

//Start TV
app.get('/WatchTV', function (req, res) { //Path set for activity in Amazon Echo Bridge Configurator
	changeActivity('Watch TV','XXXXXXXX');
	res.sendStatus(200);
});

//Start Apple TV
app.get('/AppleTV', function (req, res) {
	changeActivity('AppleTV','XXXXXXXX');
	res.sendStatus(200);
});

//Start Firestick
app.get('/Firestick', function (req, res) {
	changeActivity('Firestick','XXXXXXXX');
	res.sendStatus(200);
});

//Start Xbox One
app.get('/Xbox', function (req, res) {
	changeActivity('Xbox One','XXXXXXXX');
	res.sendStatus(200);
});

//Start WiiU
app.get('/WiiU', function (req, res) {
	changeActivity('Wii U','XXXXXXXX');
	res.sendStatus(200);
});

//Start Chromecast
app.get('/Chromecast', function (req, res) {
	changeActivity('Chromecast','XXXXXXXX');
	res.sendStatus(200);
});


//Get list of activity ids
app.get('/Activities', function (req, res) {
	harmony(harmonyip)
	.then(function(harmonyClient) {
		harmonyClient.getActivities()
		.then(function(activities) {
			activities.some(function(activity) {
				console.log(activity.label + ' (' + activity.id + ')');
			});
			harmonyClient.end();
		});
	});
	res.send('Check console for activity list');
});

//Get List of Hue Light
app.get('/ListLights', function (req, res) {
	hue.lights()
		.then(function(results) {
			console.log(results);
		})
		.done();
	res.sendStatus(200);
});

//Get List of Hue Scenes
app.get('/ListScenes', function (req, res) {
	hue.scenes()
		.then(function(results) {
			console.log(results);
		})
		.done();
	res.sendStatus(200);
});

//Get Current State of Lights
app.get('/GetHueState', function (req, res) {
	for (i = 1; i <= nhuelights; i++) {
		hue.lightStatus(i)
			.then(function(results) {
				console.log(results);
			})
			.done();
	}
	res.sendStatus(200);
});

//Start Sky Scene
app.get('/SkyScene', function (req, res) {
	hue.activateScene('62f8ac156-on-0') //Sky ID from Hue
		.done();
	winston.info("Starting Sky Scene...");
	res.sendStatus(200);
});

//Start Nightlife Scene
app.get('/NightlifeScene', function (req, res) {
	hue.setLightState(1,{"on":true, "bri":254, "hue":47125, "sat":253, "effect":"none", "xy":[0.1684,0.0416], "ct":500}).then().done();
	hue.setLightState(2,{"on":true, "bri":254, "hue":63494, "sat":253, "effect":"none", "xy":[0.6178,0.2911], "ct":500}).then().done();
	hue.setLightState(3,{"on":true, "bri":254, "hue":48695, "sat":253, "effect":"none", "xy":[0.2115,0.0656], "ct":500}).then().done();
	winston.info("Starting Nightlife Scene...");
	res.sendStatus(200);
});

//Start Daredevil Scene
app.get('/DaredevilScene', function (req, res) {
	for (i = 1; i <= nhuelights; i++) {
	hue.setLightState(i,{"on":true, "bri":254, "hue":65527, "sat":253, "effect":"none", "xy":[0.6736,0.3221], "ct":500,}).then().done();
	}
	winston.info("Starting Daredevil Scene...");
	res.sendStatus(200);
});

//Start Aurora Scene
app.get('/AuroraScene', function (req, res) {
	hue.setLightState(1,{"on":true, "bri":85, "hue":15955, "sat":  79, "effect":"none", "xy":[0.4080,0.5170], "ct":307}).then().done();
	hue.setLightState(2,{"on":true, "bri":85, "hue":15187, "sat": 129, "effect":"none", "xy":[0.3847,0.4707], "ct":353}).then().done();
	hue.setLightState(3,{"on":true, "bri":51, "hue":15629, "sat": 102, "effect":"none", "xy":[0.4080,0.5170], "ct":325}).then().done();
	winston.info("Starting Aurora Scene...");
	res.sendStatus(200);
});


var server = app.listen(8088, function () {
	var port = server.address().port;
	winston.info('Server running on port %s', port);
});
