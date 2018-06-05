var mqtt = require('mqtt');
var statistics = require('./statistics');
var count = require('./count');
var _ = require('lodash');

function Publisher(options, topic) {
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
	self.topic = (topic) ? topic : 'data';
}

Publisher.prototype.on = function() {
	var self = this;
	var client = mqtt.connect({port: self.port, host: self.host, opts: self.opts});

	client.on('connect', function(re, err){
		if (err) {
			console.log(err)
		}
		var triangle = [];
		var charts = {};
		var gauages = [];
		charts.standardCycleTime = 40;
		counter = new count.Counter();
		counter.regist('Statistics', statistics.getStatistics);
		counter.run(function(data) {
			try{
				triangle = data['Statistics'][0];
				charts.recent20AverageTime = data['Statistics'][1];
				charts.indexFor3MonthTop = data['Statistics'][2];
				charts.dailyAverageTop3 = data['Statistics'][3];
				_.drop(data['Statistics'], 4).forEach(function(element) {
					gauages.push(element[0]);
				});
			} catch(error) {
				console.error(error);
			}

			let re = {
				triangle: triangle,
				charts: charts,
				gauages: gauages
			}

			console.log('Send data to %s: %s', self.topic, JSON.stringify(re));
			client.publish(self.topic, JSON.stringify(re), {qos:1, retain:true});
			client.end();
		});
	});
}

module.exports = function(opts, topic) {
	return new Publisher(opts, topic);
}
