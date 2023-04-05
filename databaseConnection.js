//const mysql = require('mysql2');
import mysql from 'mysql2'
//mysql://k23o5dcq3pwfm61i:t3g6tvncln9peoxz@td5l74lo6615qq42.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/hvake130agwnhd4q
const is_heroku = process.env.IS_HEROKU || false;
const dbConfigHeroku = {
	user: process.env.MYSQLUSER,
    host: process.env.MYSQLHOST,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT,
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

if (is_heroku ) {
	var database = mysql.createPool(dbConfigHeroku).promise();
}
else {
	var database = mysql.createPool(dbConfigLocal).promise();
}

// module.exports = database;
export default database






// import pg from 'pg';

// const Client = pg.Client;


// const database = new Client({
//  user: "van_market_db_user",
//  database: "van_market_db",
//  port: 5432,
//  host: "dpg-cgb211hmbg55nqknona0-a",
//  password: "4EpQr5POzR6EEuEAMr1KzhV9BXknNoj9",
//  ssl: false
// });

// database.connect()


// export default database;