var argv = require('minimist')(process.argv.slice(2));
var _ = require('lodash');
var work = require('./lib/work');
var client = require('./lib/client');

delete argv._;

var tags = _.keys(argv);
var pub = new client.Publish();

tags.forEach(function(key) {
	switch(key) {
		case 'i':
			work.interval = argv[key];
			break;
		case 'h':
			pub.host = argv[key];
			break;
		case 'p':
			pub.port = argv[key];
			break;
	}
});

console.log('Start Job...')
work.start(new (require('./lib/collector')).Collector(pub));
