const _ = require('lodash')

var mapping = {};
var key = 20000510
var value = "A"

for(var i = 1; i <= 30; i++) {
	let _key = (key + i).toString();
	let _value = (i < 10) 
		?	value + "0" + i.toString() 
		: value + i.toString();

	mapping[_key] = _value;
}

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

	if(!obj) 
		return callback(self.results);
	

	let name = _.keys(obj)[0];
	obj[name](function(data) {
		self.results[name] = data;
		self.run(callback);
	});
}
exports.Counter = Counter;
