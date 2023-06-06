const mongoose = require('mongoose');
// Koneksi ke database mongoDB
// const url = 'mongodb://localhost:27017/payliteCore'; // local global
// const url = 'mongodb://adminPaylite:rahasiaPayllite2022@103.82.93.30:27017/admin'; // admin api local global
const url = 'mongodb://corePaylite:rahasiaPayllite2022@103.82.93.30:27017/payliteCore'; // api global
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Terhubung ke MongoDB');
  })
  .catch((error) => {
    console.error('Gagal terhubung ke MongoDB:', error.message);
  });

  module.exports = mongoose;