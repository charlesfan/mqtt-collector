function Collector(opts) {
	var self = this;
	if (!opts.publisher) {
		throw new Error('Options.publisher is required');
	}
	self.publisher = opts.publisher;
}

Collector.prototype.run = function() {
	var self = this;
	self.publisher.on();
}

module.exports = function(opts) {
	return new Collector(opts);
}
