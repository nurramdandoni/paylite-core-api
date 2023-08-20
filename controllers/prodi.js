const { findProdi, createProdi,findProdiById, updateProdi, findProdiByWhere } = require('../models/sql/prodiModel'); // Core API

const response500 = {
  status:"Error",
  message:"Internal Server Error!",
  data:""
}

// insert prodi
exports.createProdi = async (req, res) => {
  const data = req.body;
  
  try {
        const dataProdi =  await createProdi(data);
        if(dataProdi.status == "Sukses"){
          const response = {
            status:dataProdi.status,
            message:dataProdi.message,
            data:dataProdi.data
          }
          res.json(response);
        }else{
          const response = {
            status:dataProdi.status,
            message:dataProdi.message,
            data:dataProdi.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};

// get data prodi all
exports.searchProdi = async (req, res) => {
  try{

    const dataProdi = await findProdi();

    if (dataProdi.status == "Sukses") {
      const response = {
        status:dataProdi.status,
        message:dataProdi.message,
        data:dataProdi.data
      }
      res.json(response);
    } else {
      const response = {
        status:dataProdi.status,
        message:dataProdi.message,
        data:dataProdi.data
      }
      res.status(404).json(response);
    }

  }catch(error){
    res.status(500).json(response500);
  }
};
// get data prodi by id
exports.findProdiById = async (req, res) => {
    const ProdiId = req.params.prodiId;

    try{

      const dataProdi = await findProdiById(ProdiId);
  
      if (dataProdi.status == "Sukses") {
        const response = {
          status:dataProdi.status,
          message:dataProdi.message,
          data:dataProdi.data
        }
        res.json(response);
      } else {
        const response = {
          status:dataProdi.status,
          message:dataProdi.message,
          data:dataProdi.data
        }
        res.status(404).json(response);
      }

    }catch(error){
      res.status(500).json(response500);
    }
  };

  // update prodi
exports.updateProdi = async (req, res) => {
  const prodiId = req.params.prodiId;
  const prodiDatas =  req.body;
  
  try {
        const prodiData =  await updateProdi(prodiId, prodiDatas);
        if(prodiData.status == "Sukses"){
          const response = {
            status:prodiData.status,
            message:prodiData.message,
            data:prodiData.data
          }
          res.json(response);
        }else{
          const response = {
            status:prodiData.status,
            message:prodiData.message,
            data:prodiData.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};
// get prodi by custom
exports.findProdiByWhere = async (req, res) => {
  const DataWhere = req.body;
console.log(DataWhere)
  try{

    const dataWhere = await findProdiByWhere(DataWhere);

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