const { findDataKelas, createDataKelas,findDataKelasById, updateDataKelas, findDataKelasByWhere } = require('../models/sql/dataKelasModel'); // Core API

const response500 = {
  status:"Error",
  message:"Internal Server Error!",
  data:""
}

// insert data kelas
exports.createDataKelas = async (req, res) => {
  const data = req.body;
  
  try {
        const dataKelas =  await createDataKelas(data);
        if(dataKelas.status == "Sukses"){
          const response = {
            status:dataKelas.status,
            message:dataKelas.message,
            data:dataKelas.data
          }
          res.json(response);
        }else{
          const response = {
            status:dataKelas.status,
            message:dataKelas.message,
            data:dataKelas.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};

// get data kelas all
exports.searchDataKelas = async (req, res) => {
  try{

    const dataKelas = await findDataKelas();

    if (dataKelas.status == "Sukses") {
      const response = {
        status:dataKelas.status,
        message:dataKelas.message,
        data:dataKelas.data
      }
      res.json(response);
    } else {
      const response = {
        status:dataKelas.status,
        message:dataKelas.message,
        data:dataKelas.data
      }
      res.status(404).json(response);
    }

  }catch(error){
    res.status(500).json(response500);
  }
};
// get data kelas by id
exports.findDataKelasById = async (req, res) => {
    const DataKelasId = req.params.dataKelasId;

    try{

      const dataKelas = await findDataKelasById(DataKelasId);
  
      if (dataKelas.status == "Sukses") {
        const response = {
          status:dataKelas.status,
          message:dataKelas.message,
          data:dataKelas.data
        }
        res.json(response);
      } else {
        const response = {
          status:dataKelas.status,
          message:dataKelas.message,
          data:dataKelas.data
        }
        res.status(404).json(response);
      }

    }catch(error){
      res.status(500).json(response500);
    }
  };

  // update kelas
exports.updateDataKelas = async (req, res) => {
  const dataKelasId = req.params.dataKelasId;
  const dataKelasDatas =  req.body;
  try {
        const kelasData =  await updateDataKelas(dataKelasId, dataKelasDatas);
        if(kelasData.status == "Sukses"){
          const response = {
            status:kelasData.status,
            message:kelasData.message,
            data:kelasData.data
          }
          res.json(response);
        }else{
          const response = {
            status:kelasData.status,
            message:kelasData.message,
            data:kelasData.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};
// get data data kelas by custom
exports.findDataKelasByWhere = async (req, res) => {
  const DataWhere = req.body;
console.log(DataWhere)
  try{

    const dataWhere = await findDataKelasByWhere(DataWhere);

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