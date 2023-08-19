const { findKelas, createKelas,findKelasById, updateKelas } = require('../models/sql/kelasModel'); // Core API

const response500 = {
  status:"Error",
  message:"Internal Server Error!",
  data:""
}

// insert kelas
exports.createKelas = async (req, res) => {
  const data = req.body;
  
  try {
        const dataKelas =  await createKelas(data);
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
exports.searchKelas = async (req, res) => {
  try{

    const dataKelas = await findKelas();

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
exports.findKelasById = async (req, res) => {
    const KelasId = req.params.kelasId;

    try{

      const dataKelas = await findKelasById(KelasId);
  
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
exports.updateKelas = async (req, res) => {
  const kelasId = req.params.kelasId;
  const kelasDatas =  req.body;
  try {
        const kelasData =  await updateKelas(kelasId, kelasDatas);
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
