//const mysql = require('mysql2');
import mysql from 'mysql2'
//mysql://k23o5dcq3pwfm61i:t3g6tvncln9peoxz@td5l74lo6615qq42.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/hvake130agwnhd4q
const is_heroku = process.env.IS_HEROKU || false;

const dbConfigHeroku = {
<<<<<<< HEAD
	host: "acw2033ndw0at1t7.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
	user: "i40wodotvago9jjp",
	password: "fwde7xuqb907y8k2",
	database: "su8ad2o8zsnbmrtn",
	multipleStatements: false,
=======
	host: "td5l74lo6615qq42.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
	user: "k23o5dcq3pwfm61i",
	password: "t3g6tvncln9peoxz",
	database: "hvake130agwnhd4q",
	multipleStatements: true,
>>>>>>> c107f02ce3b296c7a844d060b7f6b7ee1c872b6c
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

//module.exports = database;
export default database

