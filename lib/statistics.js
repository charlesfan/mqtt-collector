const repository = require('./mssql');
const sql = require('mssql');
const dataMapping = ['recent20AverageTime'];

function getStatistics(fn) {
	const server = new repository.Server();

	//const data = server.storedProcedure('getLBR');
	var input = [];
	input.push({param: 'line', type: sql.VarChar, value: process.env.LINE || 'e41afaac-8aa7'});
	server.storedProcedure('getStatistics', input, function(err, data) {
		if(err) {
			console.log(err);
			server.reconnect();
		}
		return fn(data);
	});
}
exports.getStatistics = getStatistics;
