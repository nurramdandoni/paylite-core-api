const mysql = require('mysql');
// Koneksi ke database MySQL server Paylite
// const connection = mysql.createConnection({
//   host: 'paylite.co.id',
//   user: 'u1577154_super',
//   password: 'Paylite2022q@',
//   database: 'u1577154_paylite'
// });
// Koneksi ke database MySQL server Local
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'paylitecoreapi'
});


connection.connect((err) => {
  if (err) throw err;
  console.log('Terhubung ke database MySQL');
});
module.exports = connection;