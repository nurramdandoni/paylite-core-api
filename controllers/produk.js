const csv = require('csv-parser');
const fs = require('fs');

const { findProdukByName, findProdukByBarcode, createProduk } = require('../models/produkModel');

exports.searchProdukByName = async (req, res) => {
    const { nameSearch } = req.body;
    const dataProduk = await findProdukByName(nameSearch);
    console.log(dataProduk);
    if (dataProduk) {
      res.json(dataProduk);
    } else {
      res.status(404).json({ error: 'Produk tidak ditemukan' });
    }
  };
exports.searchProdukByBarcode = async (req, res) => {
    const idbarcode = req.params.idbarcode;
    const dataProduk = await findProdukByBarcode(idbarcode);
    console.log(dataProduk);
    if (dataProduk) {
      res.json(dataProduk);
    } else {
      res.status(404).json({ error: 'Produk tidak ditemukan' });
    }
  };
exports.createProdukByCsv = async (req, res) => {
    const { csvPath } = req.body;
    
    try {
      // Read the CSV file
      const results = [];
      fs.createReadStream(csvPath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
          // Process each row and create users
          for (const row of results) {
            const { key, value, img } = row;
            console.log(key,row);
            await createProduk(key, value, img);
          }
  
          res.json({ message: 'Data inserted from CSV successfully.' });
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Gagal memasukkan data dari CSV' });
    }
  };
exports.createProduk = async (req, res) => {
    const { barcode, nama, img } = req.body;
    
    try {
          const saved =  await createProduk(barcode, nama, img);
          if(saved.status == "sukses"){
              res.json({ message: 'Data inserted successfully.' });
          }else{
            res.status(422).json({ error: saved.message });
          }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Gagal memasukkan data' });
    }
  };