const { findProdukPaylite, findProdukPayliteById, createProdukPaylite, updateProdukPaylite } = require('../models/sql/payliteProdukModel'); // Core API

const response500 = {
  status:"Error",
  message:"Internal Server Error!",
  data:""
}

// insert produkPaylite
exports.createProdukPaylite = async (req, res) => {
  const data = req.body;
  
  try {
        const dataProdukPaylite =  await createProdukPaylite(data);
        if(dataProdukPaylite.status == "Sukses"){
          const response = {
            status:dataProdukPaylite.status,
            message:dataProdukPaylite.message,
            data:dataProdukPaylite.data
          }
          res.json(response);
        }else{
          const response = {
            status:dataProdukPaylite.status,
            message:dataProdukPaylite.message,
            data:dataProdukPaylite.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};

// get data produkPaylite all
exports.searchProdukPaylite = async (req, res) => {
  try{

    const dataProdukPaylite = await findProdukPaylite();

    if (dataProdukPaylite.status == "Sukses") {
      const response = {
        status:dataProdukPaylite.status,
        message:dataProdukPaylite.message,
        data:dataProdukPaylite.data
      }
      res.json(response);
    } else {
      const response = {
        status:dataProdukPaylite.status,
        message:dataProdukPaylite.message,
        data:dataProdukPaylite.data
      }
      res.status(404).json(response);
    }

  }catch(error){
    res.status(500).json(response500);
  }
};
// get data produkPaylite by barcode
exports.searchProdukPayliteById = async (req, res) => {
    const payliteProdukId = req.params.payliteProdukId;

    try{

      const dataProdukPaylite = await findProdukPayliteById(payliteProdukId);
  
      if (dataProdukPaylite.status == "Sukses") {
        const response = {
          status:dataProdukPaylite.status,
          message:dataProdukPaylite.message,
          data:dataProdukPaylite.data
        }
        res.json(response);
      } else {
        const response = {
          status:dataProdukPaylite.status,
          message:dataProdukPaylite.message,
          data:dataProdukPaylite.data
        }
        res.status(404).json(response);
      }

    }catch(error){
      res.status(500).json(response500);
    }
  };

  // update produkPaylite
exports.updateProdukPaylite = async (req, res) => {
  const payliteProdukId = req.params.payliteProdukId;
  const payliteProdukData =  req.body;
  
  try {
        const dataProdukPaylite =  await updateProdukPaylite(payliteProdukId, payliteProdukData);
        if(dataProdukPaylite.status == "Sukses"){
          const response = {
            status:dataProdukPaylite.status,
            message:dataProdukPaylite.message,
            data:dataProdukPaylite.data
          }
          res.json(response);
        }else{
          const response = {
            status:dataProdukPaylite.status,
            message:dataProdukPaylite.message,
            data:dataProdukPaylite.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};
