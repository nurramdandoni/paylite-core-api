const { Sequelize } = require('sequelize');
// Koneksi ke database MySQL server Paylite
// const connection = mysql.createConnection({
//   host: 'paylite.co.id',
//   user: 'u1577154_super',
//   password: 'Paylite2022q@',
//   database: 'u1577154_paylite'
// });
// Koneksi ke database MySQL server Local
// Inisialisasi koneksi ke database
const sequelize = new Sequelize('paylitecoreapi', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

// Cek koneksi ke database
sequelize.authenticate()
  .then(() => {
    console.log('Terhubung ke MySQL.');
  })
  .catch((error) => {
    console.error('Gagal Terhubung Ke MySQL', error);
  });
module.exports = sequelize;