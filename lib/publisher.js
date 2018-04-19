var mqtt = require('mqtt');
var lbr = require('./lbr');
var count = require('./count');
var _ = require('lodash');

function Publisher(options) {
	if (!options.host || !options.port) {
		throw new Error('Options.host && Options.port is required');
	}
	var self = this;
	self.host = options.host;
	self.port = options.port;
	if (options.opts) {
		self.opts = options.opts;
	} else {
		self.opts = {encoding:'utf8', clientId: 'collector'};
	}
}

Publisher.prototype.on = function() {
	var self = this;
	var client = mqtt.connect({port: self.port, host: self.host, opts: self.opts});

	client.on('connect', function(re, err){
		if (err) {
			console.log(err)
		}
		var charts = {};
		var gauages = [];
		charts.standardCycleTime = 40;
		counter = new count.Counter();
		counter.regist('Statistics', lbr.getStatistics);
		counter.run(function(data) {
			charts.recent20AverageTime = data['Statistics'][0];
			_.drop(data['Statistics']).forEach(function(element) {
				gauages.push(element[0]);
			});;

			console.log('Send data: %s', JSON.stringify(charts));
			console.log('Send data: %s', JSON.stringify(gauages));
			client.publish('data', JSON.stringify(charts), {qos:1, retain:true});
			client.publish('data', JSON.stringify(gauages), {qos:1, retain:true});
			client.end();
		});
	});
}

module.exports = function(opts) {
	return new Publisher(opts);
}
