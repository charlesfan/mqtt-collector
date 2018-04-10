function Collector(pub, sub) {
	var self = this;
	self.pub = pub;
	self.sub = sub;
}

Collector.prototype.run = function() {
	var self = this;
	self.pub.on();
}

exports.Collector = Collector;
