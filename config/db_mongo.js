const mongoose = require('mongoose');
// Koneksi ke database mongoDB
const url = 'mongodb://localhost:27017/payliteCore'; // local global
// const url = 'mongodb://adminPaylite:rahasiaPayllite2022@103.82.93.30:27017/admin'; // local global
// const url = 'mongodb://AdminSuperDev:paylite2022qDB@localhost:27017/payliteCore'; // local
// const url = 'mongodb://testmiminNew:d4rk3xC4l!bur@103.52.115.178:27017/payliteCore'; // server
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Terhubung ke MongoDB');
  })
  .catch((error) => {
    console.error('Gagal terhubung ke MongoDB:', error.message);
  });

  module.exports = mongoose;