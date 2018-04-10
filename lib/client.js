var mqtt = require('mqtt');

function Publish() {
	var self = this;
	self.host = 'localhost';
	self.port = 1883;
	self.opts = {encoding:'utf8', clientId: 'collector'};
}

Publish.prototype.on = function() {
	var client = mqtt.connect({port: this.port, host: this.host, opts: this.opts});

	client.on('connect', function(re, err){
		if (err) {
			console.log(err)
		}
		client.publish('/data', JSON.stringify({data: "here is data"}), {qos:1, retain:true});
		client.end();
	});
}

exports.Publish = Publish;
