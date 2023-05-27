const csv = require('csv-parser');
const fs = require('fs');

const { findProduk, findProdukByName, findProdukByBarcode, createProduk, updateProduk, deleteProduk } = require('../models/nosql/produkModel'); // Core API

const response500 = {
  status:"Error",
  message:"Internal Server Error!",
  data:""
}

// insert produk
exports.createProduk = async (req, res) => {
  const { barcode, nama, img } = req.body;
  
  try {
        const dataProduk =  await createProduk(barcode, nama, img);
        if(dataProduk.status == "Sukses"){
          const response = {
            status:dataProduk.status,
            message:dataProduk.message,
            data:dataProduk.data
          }
          res.json(response);
        }else{
          const response = {
            status:dataProduk.status,
            message:dataProduk.message,
            data:dataProduk.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};
// insert produk bulk by csv
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
        let countSukses = 0;
        let countgagal = 0;
        for (const row of results) {
          const { key, value, img } = row;
          console.log(key,row);
          const saved = await createProduk(key, value, img);
          if(saved.status == "Sukses"){
            countSukses++;
          }else{
            countgagal++;

          }
        }

        const response = {
          status:"Sukses",
          message:"Data Berhasil Ditambahkan!",
          data:"Total Sukses : "+countSukses+" Data, Total Gagal : "+countgagal+" Data"
        }

        res.json(response);
      });
  } catch (error) {
    console.log(error);
    res.status(500).json(response500);
  }
};
// get data produk all
exports.searchProduk = async (req, res) => {
  try{

    const dataProduk = await findProduk();

    if (dataProduk.status == "Sukses") {
      const response = {
        status:dataProduk.status,
        message:dataProduk.message,
        data:dataProduk.data
      }
      res.json(response);
    } else {
      const response = {
        status:dataProduk.status,
        message:dataProduk.message,
        data:dataProduk.data
      }
      res.status(404).json(response);
    }

  }catch(error){
    res.status(500).json(response500);
  }
};
// get data produk by barcode
exports.searchProdukByBarcode = async (req, res) => {
    const idbarcode = req.params.idbarcode;

    try{

      const dataProduk = await findProdukByBarcode(idbarcode);
  
      if (dataProduk.status == "Sukses") {
        const response = {
          status:dataProduk.status,
          message:dataProduk.message,
          data:dataProduk.data
        }
        res.json(response);
      } else {
        const response = {
          status:dataProduk.status,
          message:dataProduk.message,
          data:dataProduk.data
        }
        res.status(404).json(response);
      }

    }catch(error){
      res.status(500).json(response500);
    }
  };
// get data produk by nama
  exports.searchProdukByName = async (req, res) => {
    const { nameSearch } = req.body;
    try{

      const dataProduk = await findProdukByName(nameSearch);
      
      if (dataProduk.status == "Sukses") {
        const response = {
          status:dataProduk.status,
          message:dataProduk.message,
          data:dataProduk.data
        }
        res.json(response);
      } else {
        const response = {
          status:dataProduk.status,
          message:dataProduk.message,
          data:dataProduk.data
        }
        res.status(404).json(response);
      }

    }catch(error){
      res.status(500).json(response500);
    }
  };
  // update produk
exports.updateProduk = async (req, res) => {
  const { barcode } = req.body;
  
  try {
        const dataProduk =  await updateProduk(barcode,req.body);
        if(dataProduk.status == "Sukses"){
          const response = {
            status:dataProduk.status,
            message:dataProduk.message,
            data:dataProduk.data
          }
          res.json(response);
        }else{
          const response = {
            status:dataProduk.status,
            message:dataProduk.message,
            data:dataProduk.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};
  // delete produk
exports.deleteProduk = async (req, res) => {
  const { id } = req.body;
  
  try {
        const dataProduk =  await deleteProduk(id);
        if(dataProduk.status == "Sukses"){
          const response = {
            status:dataProduk.status,
            message:dataProduk.message,
            data:dataProduk.data
          }
          res.json(response);
        }else{
          const response = {
            status:dataProduk.status,
            message:dataProduk.message,
            data:dataProduk.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};