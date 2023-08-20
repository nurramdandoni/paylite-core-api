const { findLembagaPendidikan, createLembagaPendidikan,findLembagaPendidikanById, updateLembagaPendidikan, findLembagaPendidikanByWhere } = require('../models/sql/lembagaPendidikanModel'); // Core API

const response500 = {
  status:"Error",
  message:"Internal Server Error!",
  data:""
}

// insert lembaga pendidikan
exports.createLembagaPendidikan = async (req, res) => {
  const data = req.body;
  
  try {
        const dataLembagaPendidikan =  await createLembagaPendidikan(data);
        if(dataLembagaPendidikan.status == "Sukses"){
          const response = {
            status:dataLembagaPendidikan.status,
            message:dataLembagaPendidikan.message,
            data:dataLembagaPendidikan.data
          }
          res.json(response);
        }else{
          const response = {
            status:dataLembagaPendidikan.status,
            message:dataLembagaPendidikan.message,
            data:dataLembagaPendidikan.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};

// get data lembaga pendidikan all
exports.searchLembagaPendidikan = async (req, res) => {
  try{

    const dataLembagaPendidikan = await findLembagaPendidikan();

    if (dataLembagaPendidikan.status == "Sukses") {
      const response = {
        status:dataLembagaPendidikan.status,
        message:dataLembagaPendidikan.message,
        data:dataLembagaPendidikan.data
      }
      res.json(response);
    } else {
      const response = {
        status:dataLembagaPendidikan.status,
        message:dataLembagaPendidikan.message,
        data:dataLembagaPendidikan.data
      }
      res.status(404).json(response);
    }

  }catch(error){
    res.status(500).json(response500);
  }
};
// get data lembaga pendidikan by id
exports.findLembagaPendidikanById = async (req, res) => {
    const lembagaPendidikannId = req.params.lembagaPendidikanId;

    try{

      const datalembagaPendidikan = await findLembagaPendidikanById(lembagaPendidikannId);
  
      if (datalembagaPendidikan.status == "Sukses") {
        const response = {
          status:datalembagaPendidikan.status,
          message:datalembagaPendidikan.message,
          data:datalembagaPendidikan.data
        }
        res.json(response);
      } else {
        const response = {
          status:datalembagaPendidikan.status,
          message:datalembagaPendidikan.message,
          data:datalembagaPendidikan.data
        }
        res.status(404).json(response);
      }

    }catch(error){
      res.status(500).json(response500);
    }
  };

  // update lembaga pendidikan
exports.updateLembagaPendidikan = async (req, res) => {
  const lembagaPendidikanId = req.params.lembagaPendidikanId;
  const lembagaPendidikanDatas =  req.body;
  
  try {
        const lembagaPendidikanData =  await updateLembagaPendidikan(lembagaPendidikanId, lembagaPendidikanDatas);
        if(lembagaPendidikanData.status == "Sukses"){
          const response = {
            status:lembagaPendidikanData.status,
            message:lembagaPendidikanData.message,
            data:lembagaPendidikanData.data
          }
          res.json(response);
        }else{
          const response = {
            status:lembagaPendidikanData.status,
            message:lembagaPendidikanData.message,
            data:lembagaPendidikanData.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};
// get lembaga pendidikan krs by custom
exports.findLembagaPendidikanByWhere = async (req, res) => {
  const DataWhere = req.body;
console.log(DataWhere)
  try{

    const dataWhere = await findLembagaPendidikanByWhere(DataWhere);

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