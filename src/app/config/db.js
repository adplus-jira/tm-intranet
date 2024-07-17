const mysql = require('mysql2');

const db = mysql.createConnection({
  host: '34.64.172.30',
  port: '3306',
  user: 'root',
  password: '1111',
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