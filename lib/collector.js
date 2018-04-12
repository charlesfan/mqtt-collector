function Collector(opts) {
	var self = this;
	if (!opts.publisher) {
		throw new Error('Options.publisher is required');
	}
	/*
	if (!opts.subcriber) {
		throw new Error('Options.subcriber is required');
	}
	*/
	self.publisher = opts.publisher;
	//self.subcriber = opts.subcriber;
}

Collector.prototype.run = function() {
	var self = this;
	self.publisher.on();
}

module.exports = function(opts) {
	return new Collector(opts);
}
