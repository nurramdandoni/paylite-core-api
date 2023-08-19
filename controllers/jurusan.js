const { findJurusan, createJurusan,findJurusanById, updateJurusan } = require('../models/sql/jurusanModel'); // Core API

const response500 = {
  status:"Error",
  message:"Internal Server Error!",
  data:""
}

// insert jurusan
exports.createJurusan = async (req, res) => {
  const data = req.body;
  
  try {
        const dataJurusan =  await createJurusan(data);
        if(dataJurusan.status == "Sukses"){
          const response = {
            status:dataJurusan.status,
            message:dataJurusan.message,
            data:dataJurusan.data
          }
          res.json(response);
        }else{
          const response = {
            status:dataJurusan.status,
            message:dataJurusan.message,
            data:dataJurusan.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};

// get data jurusan all
exports.searchJurusan = async (req, res) => {
  try{

    const dataJurusan = await findJurusan();

    if (dataJurusan.status == "Sukses") {
      const response = {
        status:dataJurusan.status,
        message:dataJurusan.message,
        data:dataJurusan.data
      }
      res.json(response);
    } else {
      const response = {
        status:dataJurusan.status,
        message:dataJurusan.message,
        data:dataJurusan.data
      }
      res.status(404).json(response);
    }

  }catch(error){
    res.status(500).json(response500);
  }
};
// get data jurusan by id
exports.findJurusanById = async (req, res) => {
    const JurusanId = req.params.jurusanId;

    try{

      const dataJurusan = await findJurusanById(JurusanId);
  
      if (dataJurusan.status == "Sukses") {
        const response = {
          status:dataJurusan.status,
          message:dataJurusan.message,
          data:dataJurusan.data
        }
        res.json(response);
      } else {
        const response = {
          status:dataJurusan.status,
          message:dataJurusan.message,
          data:dataJurusan.data
        }
        res.status(404).json(response);
      }

    }catch(error){
      res.status(500).json(response500);
    }
  };

  // update jurusan
exports.updateJurusan = async (req, res) => {
  const jurusanId = req.params.jurusanId;
  const jurusanDatas =  req.body;
  
  try {
        const jurusanData =  await updateJurusan(jurusanId, jurusanDatas);
        if(jurusanData.status == "Sukses"){
          const response = {
            status:jurusanData.status,
            message:jurusanData.message,
            data:jurusanData.data
          }
          res.json(response);
        }else{
          const response = {
            status:jurusanData.status,
            message:jurusanData.message,
            data:jurusanData.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};
