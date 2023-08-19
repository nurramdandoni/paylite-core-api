const { findNilai, createNilai,findNilaiById, updateNilai } = require('../models/sql/nilaiModel'); // Core API

const response500 = {
  status:"Error",
  message:"Internal Server Error!",
  data:""
}

// insert data nilai
exports.createNilai = async (req, res) => {
  const data = req.body;
  
  try {
        const dataNilai =  await createNilai(data);
        if(dataNilai.status == "Sukses"){
          const response = {
            status:dataNilai.status,
            message:dataNilai.message,
            data:dataNilai.data
          }
          res.json(response);
        }else{
          const response = {
            status:dataNilai.status,
            message:dataNilai.message,
            data:dataNilai.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};

// get data nilai all
exports.searchNilai = async (req, res) => {
  try{

    const dataNilai = await findNilai();

    if (dataNilai.status == "Sukses") {
      const response = {
        status:dataNilai.status,
        message:dataNilai.message,
        data:dataNilai.data
      }
      res.json(response);
    } else {
      const response = {
        status:dataNilai.status,
        message:dataNilai.message,
        data:dataNilai.data
      }
      res.status(404).json(response);
    }

  }catch(error){
    res.status(500).json(response500);
  }
};
// get data nilai by id
exports.findNilaiById = async (req, res) => {
    const NilaiId = req.params.nilaiId;

    try{

      const dataNilai = await findNilaiById(NilaiId);
  
      if (dataNilai.status == "Sukses") {
        const response = {
          status:dataNilai.status,
          message:dataNilai.message,
          data:dataNilai.data
        }
        res.json(response);
      } else {
        const response = {
          status:dataNilai.status,
          message:dataNilai.message,
          data:dataNilai.data
        }
        res.status(404).json(response);
      }

    }catch(error){
      res.status(500).json(response500);
    }
  };

  // update nilai
exports.updateNilai = async (req, res) => {
  const NilaiId = req.params.nilaiId;
  const nilaiDatas =  req.body;
  try {
        const nilaiData =  await updateNilai(NilaiId, nilaiDatas);
        if(nilaiData.status == "Sukses"){
          const response = {
            status:nilaiData.status,
            message:nilaiData.message,
            data:nilaiData.data
          }
          res.json(response);
        }else{
          const response = {
            status:nilaiData.status,
            message:nilaiData.message,
            data:nilaiData.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};
