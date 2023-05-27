const mongoose = require('mongoose');
// Koneksi ke database mongoDB
const url = 'mongodb://localhost:27017/payliteCore';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Terhubung ke MongoDB');
  })
  .catch((error) => {
    console.error('Gagal terhubung ke MongoDB:', error);
  });

  module.exports = mongoose;