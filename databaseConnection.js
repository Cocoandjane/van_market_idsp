//const mysql = require('mysql2');
import mysql from 'mysql2'
//mysql://k23o5dcq3pwfm61i:t3g6tvncln9peoxz@td5l74lo6615qq42.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/hvake130agwnhd4q
const is_heroku = process.env.IS_HEROKU || false;

const dbConfigHeroku = {
	host: "td5l74lo6615qq42.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
	user: "k23o5dcq3pwfm61i",
	password: "t3g6tvncln9peoxz",
	database: "hvake130agwnhd4q",
	multipleStatements: true,
	namedPlaceholders: true
};

const dbConfigLocal = {
	host: "localhost",
	user: "root",
	password: "Murad19112001!",
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

