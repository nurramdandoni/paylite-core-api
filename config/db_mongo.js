const mongoose = require('mongoose');
// Koneksi ke database mongoDB
const url = 'mongodb://localhost:27017/payliteCore'; // local global
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