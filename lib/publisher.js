var mqtt = require('mqtt');
var lbr = require('./lbr');
var count = require('./count');

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
		charts.standardCycleTime = 40;
		counter = new count.Counter();
		counter.regist('LBR', lbr.getLBR);
		counter.run(function(data) {
			charts.recent20AverageTime = data['LBR'];

			console.log('Send data: %s', JSON.stringify(charts));
			client.publish('data', JSON.stringify(charts), {qos:1, retain:true});
			client.end();
		});
	});
}

module.exports = function(opts) {
	return new Publisher(opts);
}
