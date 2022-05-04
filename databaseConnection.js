const mysql = require('mysql2');

const is_heroku = process.env.IS_HEROKU || false;

const dbConfigHeroku = {
	host: "acw2033ndw0at1t7.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
	user: "i40wodotvago9jjp",
	password: "fwde7xuqb907y8k2",
	database: "su8ad2o8zsnbmrtn",
	multipleStatements: false,
	namedPlaceholders: true
};

const dbConfigLocal = {
	host: "localhost",
	user: "root",
	password: "Feiyang999",
	database: "van_market",
	multipleStatements: false,
	namedPlaceholders: true
};

if (is_heroku) {
	var database = mysql.createPool(dbConfigHeroku).promise();
}
else {
	var database = mysql.createPool(dbConfigLocal).promise();
}

module.exports = database;
		
		