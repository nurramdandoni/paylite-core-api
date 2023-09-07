const { findAbsensi, createAbsensi,findAbsensiById, updateAbsensi, findAbsensiByWhere, findAbsensiByWhereTanggal, findAbsensiByWhereTanggalRekap } = require('../models/sql/absensiModel'); // Core API

const response500 = {
  status:"Error",
  message:"Internal Server Error!",
  data:""
}

// insert data absensi
exports.createAbsensi = async (req, res) => {
  const data = req.body;
  
  try {
        const dataAbsensi =  await createAbsensi(data);
        if(dataAbsensi.status == "Sukses"){
          const response = {
            status:dataAbsensi.status,
            message:dataAbsensi.message,
            data:dataAbsensi.data
          }
          res.json(response);
        }else{
          const response = {
            status:dataAbsensi.status,
            message:dataAbsensi.message,
            data:dataAbsensi.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};

// get data absensi all
exports.searchAbsensi = async (req, res) => {
  try{

    const dataAbsensi = await findAbsensi();

    if (dataAbsensi.status == "Sukses") {
      const response = {
        status:dataAbsensi.status,
        message:dataAbsensi.message,
        data:dataAbsensi.data
      }
      res.json(response);
    } else {
      const response = {
        status:dataAbsensi.status,
        message:dataAbsensi.message,
        data:dataAbsensi.data
      }
      res.status(404).json(response);
    }

  }catch(error){
    res.status(500).json(response500);
  }
};
// get data absensi by id
exports.findAbsensiById = async (req, res) => {
    const AbsensiId = req.params.absensiId;

    try{

      const dataAbsensi = await findAbsensiById(AbsensiId);
  
      if (dataAbsensi.status == "Sukses") {
        const response = {
          status:dataAbsensi.status,
          message:dataAbsensi.message,
          data:dataAbsensi.data
        }
        res.json(response);
      } else {
        const response = {
          status:dataAbsensi.status,
          message:dataAbsensi.message,
          data:dataAbsensi.data
        }
        res.status(404).json(response);
      }

    }catch(error){
      res.status(500).json(response500);
    }
  };

  // update absensi
exports.updateAbsensi = async (req, res) => {
  const AbsensiId = req.params.absensiId;
  const absensiDatas =  req.body;
  try {
        const absensiData =  await updateAbsensi(AbsensiId, absensiDatas);
        if(absensiData.status == "Sukses"){
          const response = {
            status:absensiData.status,
            message:absensiData.message,
            data:absensiData.data
          }
          res.json(response);
        }else{
          const response = {
            status:absensiData.status,
            message:absensiData.message,
            data:absensiData.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};

// get data absensi by custom
exports.findAbsensiByWhere = async (req, res) => {
    const DataWhere = req.body;
console.log(DataWhere)
    try{

      const dataWhere = await findAbsensiByWhere(DataWhere);
  
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

exports.findAbsensiByWhereTanggal = async (req, res) => {
    const DataWhere = req.body;
console.log(DataWhere)
    try{

      const dataWhere = await findAbsensiByWhereTanggal(DataWhere);
  
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
exports.findAbsensiByWhereTanggalRekap = async (req, res) => {
    const DataWhere = req.body;
console.log(DataWhere)
    try{

      const dataWhere = await findAbsensiByWhereTanggalRekap(DataWhere);
  
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