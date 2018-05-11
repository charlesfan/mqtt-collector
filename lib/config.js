var config = exports;

//MQTT Broker
config.broker = {
	host: 'localhost',
	port: 1883
}

config.mssqlServer = {
	server: process.env.DB_HOST || 'localhost',
	user: process.env.DB_USER || 'admin',
	password: process.env.DB_PASSWORD || 'admin',
	port: process.env.DB_PORT || 1433,
	database: process.env.DataBase || 'losn-ti'
}
