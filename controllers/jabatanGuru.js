const { findJabatanGuru, createJabatanGuru,findJabatanGuruById, updateJabatanGuru } = require('../models/sql/jabatanGuruModel'); // Core API

const response500 = {
  status:"Error",
  message:"Internal Server Error!",
  data:""
}

// insert jabatan guru
exports.createJabatanGuru = async (req, res) => {
  const data = req.body;
  
  try {
        const dataJabatanGuru =  await createJabatanGuru(data);
        if(dataJabatanGuru.status == "Sukses"){
          const response = {
            status:dataJabatanGuru.status,
            message:dataJabatanGuru.message,
            data:dataJabatanGuru.data
          }
          res.json(response);
        }else{
          const response = {
            status:dataJabatanGuru.status,
            message:dataJabatanGuru.message,
            data:dataJabatanGuru.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};

// get data jabatan guru all
exports.searchJabatanGuru = async (req, res) => {
  try{

    const dataJabatanGuru = await findJabatanGuru();

    if (dataJabatanGuru.status == "Sukses") {
      const response = {
        status:dataJabatanGuru.status,
        message:dataJabatanGuru.message,
        data:dataJabatanGuru.data
      }
      res.json(response);
    } else {
      const response = {
        status:dataJabatanGuru.status,
        message:dataJabatanGuru.message,
        data:dataJabatanGuru.data
      }
      res.status(404).json(response);
    }

  }catch(error){
    res.status(500).json(response500);
  }
};
// get data jabatan guru by id
exports.findJabatanGuruById = async (req, res) => {
    const JabatanGuruId = req.params.jabatanGuruId;

    try{

      const dataJabatanGuru = await findJabatanGuruById(JabatanGuruId);
  
      if (dataJabatanGuru.status == "Sukses") {
        const response = {
          status:dataJabatanGuru.status,
          message:dataJabatanGuru.message,
          data:dataJabatanGuru.data
        }
        res.json(response);
      } else {
        const response = {
          status:dataJabatanGuru.status,
          message:dataJabatanGuru.message,
          data:dataJabatanGuru.data
        }
        res.status(404).json(response);
      }

    }catch(error){
      res.status(500).json(response500);
    }
  };

  // update jabatan guru
exports.updateJabatanGuru = async (req, res) => {
  const jabatanGuruId = req.params.jabatanGuruId;
  const jabatanGuruDatas =  req.body;
  try {
        const jabatanGuruData =  await updateJabatanGuru(jabatanGuruId, jabatanGuruDatas);
        if(jabatanGuruData.status == "Sukses"){
          const response = {
            status:jabatanGuruData.status,
            message:jabatanGuruData.message,
            data:jabatanGuruData.data
          }
          res.json(response);
        }else{
          const response = {
            status:jabatanGuruData.status,
            message:jabatanGuruData.message,
            data:jabatanGuruData.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};
