const { findRoleProduk, createRoleProduk, findRoleProdukById, updateRoleProduk, findRoleProdukByWhere } = require('../models/sql/roleProdukModel'); // Core API

const response500 = {
  status:"Error",
  message:"Internal Server Error!",
  data:""
}

// insert role Produk
exports.createRoleProduk = async (req, res) => {
  const data = req.body;
  
  try {
        const dataRoleProduk =  await createRoleProduk(data);
        if(dataRoleProduk.status == "Sukses"){
          const response = {
            status:dataRoleProduk.status,
            message:dataRoleProduk.message,
            data:dataRoleProduk.data
          }
          res.json(response);
        }else{
          const response = {
            status:dataRoleProduk.status,
            message:dataRoleProduk.message,
            data:dataRoleProduk.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};

// get data role Produk all
exports.searchRoleProduk = async (req, res) => {
  try{

    const dataRoleProduk = await findRoleProduk();

    if (dataRoleProduk.status == "Sukses") {
      const response = {
        status:dataRoleProduk.status,
        message:dataRoleProduk.message,
        data:dataRoleProduk.data
      }
      res.json(response);
    } else {
      const response = {
        status:dataRoleProduk.status,
        message:dataRoleProduk.message,
        data:dataRoleProduk.data
      }
      res.status(404).json(response);
    }

  }catch(error){
    res.status(500).json(response500);
  }
};
// get data role produk by id
exports.findRoleProdukById = async (req, res) => {
    const roleProdukId = req.params.roleProdukId;

    try{

      const dataRoleProduk = await findRoleProdukById(roleProdukId);
  
      if (dataRoleProduk.status == "Sukses") {
        const response = {
          status:dataRoleProduk.status,
          message:dataRoleProduk.message,
          data:dataRoleProduk.data
        }
        res.json(response);
      } else {
        const response = {
          status:dataRoleProduk.status,
          message:dataRoleProduk.message,
          data:dataRoleProduk.data
        }
        res.status(404).json(response);
      }

    }catch(error){
      res.status(500).json(response500);
    }
  };

  // update role produk
exports.updateRoleProduk = async (req, res) => {
  const roleProdukId = req.params.roleProdukId;
  const roleProdukData =  req.body;
  
  try {
        const dataRoleProduk =  await updateRoleProduk(roleProdukId, roleProdukData);
        if(dataRoleProduk.status == "Sukses"){
          const response = {
            status:dataRoleProduk.status,
            message:dataRoleProduk.message,
            data:dataRoleProduk.data
          }
          res.json(response);
        }else{
          const response = {
            status:dataRoleProduk.status,
            message:dataRoleProduk.message,
            data:dataRoleProduk.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};
// get role produk by custom
exports.findRoleProdukByWhere = async (req, res) => {
  const DataWhere = req.body;
console.log(DataWhere)
  try{

    const dataWhere = await findRoleProdukByWhere(DataWhere);

    if (dataWhere.status == "Sukses") {
      const response = {
        status:dataWhere.status,
        message:dataWhere.message,
        data:dataWhere.data
      }
      res.json(response);
    } else {
      const response = {
        status:dataWhere.status,
        message:dataWhere.message,
        data:dataWhere.data
      }
      res.status(404).json(response);
    }

  }catch(error){
    res.status(500).json(response500);
  }
};