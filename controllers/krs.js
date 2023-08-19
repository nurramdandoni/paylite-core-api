const { findKrs, createKrs,findKrsById, updateKrs } = require('../models/sql/krsModel'); // Core API

const response500 = {
  status:"Error",
  message:"Internal Server Error!",
  data:""
}

// insert data krs
exports.createKrs = async (req, res) => {
  const data = req.body;
  
  try {
        const dataKrs =  await createKrs(data);
        if(dataKrs.status == "Sukses"){
          const response = {
            status:dataKrs.status,
            message:dataKrs.message,
            data:dataKrs.data
          }
          res.json(response);
        }else{
          const response = {
            status:dataKrs.status,
            message:dataKrs.message,
            data:dataKrs.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};

// get data krs all
exports.searchKrs = async (req, res) => {
  try{

    const dataKrs = await findKrs();

    if (dataKrs.status == "Sukses") {
      const response = {
        status:dataKrs.status,
        message:dataKrs.message,
        data:dataKrs.data
      }
      res.json(response);
    } else {
      const response = {
        status:dataKrs.status,
        message:dataKrs.message,
        data:dataKrs.data
      }
      res.status(404).json(response);
    }

  }catch(error){
    res.status(500).json(response500);
  }
};
// get data krs by id
exports.findKrsById = async (req, res) => {
    const KrsId = req.params.krsId;

    try{

      const dataKrs = await findKrsById(KrsId);
  
      if (dataKrs.status == "Sukses") {
        const response = {
          status:dataKrs.status,
          message:dataKrs.message,
          data:dataKrs.data
        }
        res.json(response);
      } else {
        const response = {
          status:dataKrs.status,
          message:dataKrs.message,
          data:dataKrs.data
        }
        res.status(404).json(response);
      }

    }catch(error){
      res.status(500).json(response500);
    }
  };

  // update krs
exports.updateKrs = async (req, res) => {
  const KrsId = req.params.krsId;
  const krsDatas =  req.body;
  try {
        const krsData =  await updateKrs(KrsId, krsDatas);
        if(krsData.status == "Sukses"){
          const response = {
            status:krsData.status,
            message:krsData.message,
            data:krsData.data
          }
          res.json(response);
        }else{
          const response = {
            status:krsData.status,
            message:krsData.message,
            data:krsData.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};