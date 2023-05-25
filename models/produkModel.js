const mongoose = require('mongoose');

const produkSchema = new mongoose.Schema({
    barcode: { type: String, unique: true },
    nama: String,
    img: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  
  const Produk = mongoose.model('Produks', produkSchema);
  
  Produk.createIndexes({ barcode: 1 }, { unique: true });

  async function createProduk(barcode, nama, img) {
    try {
      const newProduk = new Produk({ barcode, nama, img});
      const savedProduk = await newProduk.save();
      // console.log('Pengguna baru telah ditambahkan:', savedProduk);
      const res = {
        status:"sukses",
        message:"Data Berhasil Ditambahkan!"
      }
      return res;
    } catch (error) {
      const res = {
        status:"error",
        message:error.message
      }
      return res;
      // console.log(error.message);
    }
  }

  // Fungsi untuk mencari produk berdasarkan barcode
  async function findProdukByBarcode(barcode) {
    try {
      const produk = await Produk.find({barcode:barcode});
      if (produk) {
        // console.log('Produk ditemukan:', produk);
        return produk;
      } else {
        console.log('Produk dengan Barcode tersebut tidak ditemukan');
      }
    } catch (error) {
      console.error('Gagal mencari produk:', error);
    }
  }
  // Fungsi untuk mencari produk berdasarkan nama Produk
  async function findProdukByName(nameSearch) {
    try {
      const produk = await Produk.find({ nama: { $regex: nameSearch, $options: "i" } });
      if (produk) {
        // console.log('Produk ditemukan:', produk);
        return produk;
      } else {
        console.log('Produk dengan Barcode tersebut tidak ditemukan');
      }
    } catch (error) {
      console.error('Gagal mencari produk:', error);
    }
  }

  module.exports = {Produk, findProdukByName, findProdukByBarcode, createProduk};