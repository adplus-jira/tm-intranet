const mysql = require('mysql2');

const db = mysql.createConnection({
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: '0000',
  database: 'test',
});

db.connect((err) => {
  if (err) {
    console.error('mysql connection error', err);
  } else {
    console.log('mysql connection success');
  }
});

module.exports = db;