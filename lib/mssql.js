const config = require('./config').mssqlServer;
const sql = require('mssql');
const conn = new sql.ConnectionPool(config);

conn.connect()
.then(err => {
    console.log("Connected to SQL")

})
.catch(err => {
    console.log("Cannot connected to SQL error: " + err.stack)
});

const Server = function() {
	this.request = new sql.Request(conn);
}

Server.prototype.storedProcedure = function(name, fn) {
	/*
	this.request.execute(name, (err, result) => {
		if(err) {
			console.log(err);
		}
		console.log(result.recordset);
		return result.recordset;
	});
	*/
	this.request.execute(name, function(err, result) {
		if(err) {
			console.log(err);
			return fn(err);
		}
		fn(null, result.recordset);
	});
}

exports.Server = Server;
