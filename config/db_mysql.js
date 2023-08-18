const { Sequelize } = require('sequelize');
// Koneksi ke database MySQL server Paylite
// Inisialisasi koneksi ke database
const sequelize = new Sequelize('u1577154_paylite', 'u1577154_super', 'Paylite2022q@', {
  host: 'paylite.co.id',
  dialect: 'mysql'
});
// const sequelize = new Sequelize('paylitecoreapi', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql'
// });

// Cek koneksi ke database
sequelize.authenticate()
  .then(() => {
    console.log('Terhubung ke MySQL.');
  })
  .catch((error) => {
    console.error('Gagal Terhubung Ke MySQL', error);
  });
module.exports = sequelize;