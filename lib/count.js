const _ = require('lodash')

function Counter() {
	this.funcs = [];
	this.results = {};
}

Counter.prototype.regist = function(name, fn) {
	var opt = {};
	opt[name] = fn;
	this.funcs.push(opt);
}

Counter.prototype.run = function(callback) {
	let self = this;
	if (self.funcs.length <= 0) {
		return callback(self.results);
	}

	let obj = self.funcs.pop();
	let name = _.keys(obj)[0];
	obj[name](function(data) {
		self.results[name] = data;
		self.run(callback);
	});
}
exports.Counter = Counter;
