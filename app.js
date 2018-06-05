var argv = require('minimist')(process.argv.slice(2));
var _ = require('lodash');
var collector = require('./lib/collector');
var client = require('./lib/publisher');
var config = require('./lib/config');

delete argv._;

var tags = _.keys(argv);

var broker = config.broker;
var interval = process.env.MQTT_PUB_INTERVAL || 1000;

tags.forEach(function(key) {
	switch(key) {
		case 'i':
			interval = argv[key];
			break;
		case 'h':
			broker.host = argv[key];
			break;
		case 'p':
			broker.port = argv[key];
			break;
	}
});

var opts = {
	publisher: client(broker, process.env.MQTT_PUB_TOPIC)
}

console.log('Start Job...');

setInterval(() => {
	collector(opts).run();
}, interval);
