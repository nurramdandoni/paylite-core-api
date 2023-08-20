const { findMataAjar, createMataAjar,findMataAjarById, updateMataAjar, findMataAjarByWhere } = require('../models/sql/mataAjarModel'); // Core API

const response500 = {
  status:"Error",
  message:"Internal Server Error!",
  data:""
}

// insert mata ajar
exports.createMataAjar = async (req, res) => {
  const data = req.body;
  
  try {
        const dataMataAjar =  await createMataAjar(data);
        if(dataMataAjar.status == "Sukses"){
          const response = {
            status:dataMataAjar.status,
            message:dataMataAjar.message,
            data:dataMataAjar.data
          }
          res.json(response);
        }else{
          const response = {
            status:dataMataAjar.status,
            message:dataMataAjar.message,
            data:dataMataAjar.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};

// get data mata ajar all
exports.searchMataAjar = async (req, res) => {
  try{

    const dataMataAjar = await findMataAjar();

    if (dataMataAjar.status == "Sukses") {
      const response = {
        status:dataMataAjar.status,
        message:dataMataAjar.message,
        data:dataMataAjar.data
      }
      res.json(response);
    } else {
      const response = {
        status:dataMataAjar.status,
        message:dataMataAjar.message,
        data:dataMataAjar.data
      }
      res.status(404).json(response);
    }

  }catch(error){
    res.status(500).json(response500);
  }
};
// get data mata ajar by id
exports.findMataAjarById = async (req, res) => {
    const MataAjarIdId = req.params.mataAjarId;

    try{

      const dataMataAjar = await findMataAjarById(MataAjarIdId);
  
      if (dataMataAjar.status == "Sukses") {
        const response = {
          status:dataMataAjar.status,
          message:dataMataAjar.message,
          data:dataMataAjar.data
        }
        res.json(response);
      } else {
        const response = {
          status:dataMataAjar.status,
          message:dataMataAjar.message,
          data:dataMataAjar.data
        }
        res.status(404).json(response);
      }

    }catch(error){
      res.status(500).json(response500);
    }
  };

  // update mata ajar
exports.updateMataAjar = async (req, res) => {
  const mataAjarId = req.params.mataAjarId;
  const mataAjarDatas =  req.body;
  
  try {
        const mataAjarData =  await updateMataAjar(mataAjarId, mataAjarDatas);
        if(mataAjarData.status == "Sukses"){
          const response = {
            status:mataAjarData.status,
            message:mataAjarData.message,
            data:mataAjarData.data
          }
          res.json(response);
        }else{
          const response = {
            status:mataAjarData.status,
            message:mataAjarData.message,
            data:mataAjarData.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};
// get mata ajar by custom
exports.findMataAjarByWhere = async (req, res) => {
  const DataWhere = req.body;
console.log(DataWhere)
  try{

    const dataWhere = await findMataAjarByWhere(DataWhere);

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