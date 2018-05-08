const repository = require('./mssql');
const sql = require('mssql');
const dataMapping = ['recent20AverageTime'];

function getStatistics(fn) {
	const server = new repository.Server();

	//const data = server.storedProcedure('getLBR');
	var input = [];
	input.push({param: 'people', type: sql.Int, value: 30});
	server.storedProcedure('getStatistics', input, function(err, data) {
		if(err) {
			console.log(err);
			server.reconnect();
		}
		return fn(data);
	});
}
exports.getStatistics = getStatistics;
