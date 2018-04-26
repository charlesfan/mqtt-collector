var mqtt = require('mqtt');
var statistics = require('./statistics');
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
		counter.regist('Statistics', statistics.getStatistics);
		counter.run(function(data) {
			try{
				charts.recent20AverageTime = data['Statistics'][0];
				charts.indexFor3MonthTop = data['Statistics'][1];
				charts.dailyAverageTop3 = data['Statistics'][2];
				_.drop(data['Statistics'], 3).forEach(function(element) {
					gauages.push(element[0]);
				});
			} catch(error) {
				console.error(error);
			}

			let re = {
				charts: charts,
				gauages: gauages
			}

			console.log('Send data: %s', JSON.stringify(re));
			client.publish('data', JSON.stringify(re), {qos:1, retain:true});
			client.end();
		});
	});
}

module.exports = function(opts) {
	return new Publisher(opts);
}
