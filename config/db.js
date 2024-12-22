const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    process.exit(1);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

module.exports = connection;
