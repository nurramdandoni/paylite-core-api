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

      return {status:"Sukses",message:"Data Berhasil Ditambahkan!",data:savedProduk};
      
    } catch (error) {

      return {status:"Error",message:"Terjadi Kesalahan!",data:error.message};

    }
  }

  // Fungsi untuk menampilkan semua produk
  async function findProduk() {
    try {
      const produk = await Produk.find();
      if(produk.length > 0){
        return {status:"Sukses",message:"Data Ditemukan!",data:produk};
      }else{
        return {status:"Sukses",message:"Data Tidak Ditemukan!",data:produk};
      }
    } catch (error) {
      return {status:"Error",message:"Terjadi Kesalahan!",data:error};
    }
  }
  // Fungsi untuk mencari produk berdasarkan barcode
  async function findProdukByBarcode(barcode) {
    try {
      const produk = await Produk.find({barcode:barcode});
      if(produk.length > 0){
        return {status:"Sukses",message:"Data Ditemukan!",data:produk};
      }else{
        return {status:"Sukses",message:"Data Tidak Ditemukan!",data:produk};
      }
    } catch (error) {
      return {status:"Error",message:"Terjadi Kesalahan!",data:error};
    }
  }
  // Fungsi untuk mencari produk berdasarkan nama Produk
  async function findProdukByName(nameSearch) {
    try {
      const produk = await Produk.find({ nama: { $regex: nameSearch, $options: "i" } });
      if(produk.length > 0){
        return {status:"Sukses",message:"Data Ditemukan!",data:produk};
      }else{
        return {status:"Sukses",message:"Data Tidak Ditemukan!",data:produk};
      }
    } catch (error) {
      return {status:"Error",message:"Terjadi Kesalahan!",data:error};
    }
  }

  module.exports = {Produk, findProduk, findProdukByName, findProdukByBarcode, createProduk};