
import mysql from 'mysql2'

const database = mysql.createPool({
    user: process.env.MYSQLUSER,
    host: process.env.MYSQLHOST,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT,
    multipleStatements: false,
    namedPlaceholders: true
}).promise()

// var database = mysql.createPool(db).promise();
export default database