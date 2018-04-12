var mqtt = require('mqtt');

function Publisher(options) {
	if (!options.host || !options.port) {
		throw new Error('Options.host && Options.port is required');
	}
	var self = this;
	self.count = 1;
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
		console.log('Send data: %i', self.count);
		client.publish('/data', JSON.stringify({data: self.count}), {qos:1, retain:true});
		self.count++;
		client.end();
	});
}

module.exports = function(opts) {
	return new Publisher(opts);
}
