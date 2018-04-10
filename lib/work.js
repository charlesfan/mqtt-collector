var work = exports;

work.interval = 1000; //Default: 1s

work.start = function(fn) {
	setInterval(() => {
		fn.run();
	}, this.interval);
}
