const mongoose = require('../../config/db_mongo');

const Schema = mongoose.Schema;

const produkSchema = new Schema({
  barcode: { type: String, unique: true },
  nama: String,
  img: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

  
  const Produk = mongoose.model('Produks', produkSchema);

  async function createProduk(barcode, nama, img) {
    try {
      const newProduk = new Produk({ barcode, nama, img});
      const savedProduk = await newProduk.save();
      if(savedProduk){
        return {status:"Sukses",message:"Data Berhasil Ditambahkan!!",data:savedProduk};
      }else{
        return {status:"Error",message:"Data Gagal Ditambahkan!",data:newProduk};
      }
      
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
      comsole.log(error);
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
  // Fungsi untuk mengupdate produk berdasarkan barcode
  async function updateProduk(barcode, data) {
    try {
      const updatedProduk = await Produk.findOneAndUpdate({barcode:barcode}, data, { new: true });
      if(updatedProduk){
        return {status:"Sukses",message:"Data Berhasil Diperbaharui!!",data:data};
      }else{
        return {status:"Error",message:"Data Gagal Diperbaharui!",data:data};
      }
    } catch (error) {
      console.log(error);
      return {status:"Error",message:"Terjadi Kesalahan!",data:error.message};
    }
  }
  // Fungsi untuk hapus produk berdasarkan id
  async function deleteProduk(id) {
    try {
      const deletedProduk = await Produk.findOneAndDelete({ _id: id });
      if (deletedProduk) {
        return { status: "Sukses", message: "Data berhasil dihapus!", data: deletedProduk };
      } else {
        return { status: "Error", message: "Data tidak ditemukan!", data: null };
      }
    } catch (error) {
      console.log(error);
      return { status: "Error", message: "Terjadi kesalahan saat menghapus data!",data:error.message };
    }
  }
  module.exports = { findProduk, findProdukByName, findProdukByBarcode, createProduk, updateProduk, deleteProduk};