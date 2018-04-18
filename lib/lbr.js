const repository = require('./mssql');

function getLBR(fn) {
	const server = new repository.Server();

	//const data = server.storedProcedure('getLBR');
	server.storedProcedure('getLBR', function(err, data) {
		if(err) {
			console.log(err);
		}
		return fn(data);
	});
}
exports.getLBR = getLBR;
