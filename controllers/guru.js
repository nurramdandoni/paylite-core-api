const { findGuru, createGuru,findGuruById, updateGuru } = require('../models/sql/guruModel'); // Core API

const response500 = {
  status:"Error",
  message:"Internal Server Error!",
  data:""
}

// insert guru
exports.createGuru = async (req, res) => {
  const data = req.body;
  
  try {
        const dataGuru =  await createGuru(data);
        if(dataGuru.status == "Sukses"){
          const response = {
            status:dataGuru.status,
            message:dataGuru.message,
            data:dataGuru.data
          }
          res.json(response);
        }else{
          const response = {
            status:dataGuru.status,
            message:dataGuru.message,
            data:dataGuru.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};

// get data guru all
exports.searchGuru = async (req, res) => {
  try{

    const dataGuru = await findGuru();

    if (dataGuru.status == "Sukses") {
      const response = {
        status:dataGuru.status,
        message:dataGuru.message,
        data:dataGuru.data
      }
      res.json(response);
    } else {
      const response = {
        status:dataGuru.status,
        message:dataGuru.message,
        data:dataGuru.data
      }
      res.status(404).json(response);
    }

  }catch(error){
    res.status(500).json(response500);
  }
};
// get data guru by id
exports.findGuruById = async (req, res) => {
    const GuruId = req.params.guruId;

    try{

      const dataGuru = await findGuruById(GuruId);
  
      if (dataGuru.status == "Sukses") {
        const response = {
          status:dataGuru.status,
          message:dataGuru.message,
          data:dataGuru.data
        }
        res.json(response);
      } else {
        const response = {
          status:dataGuru.status,
          message:dataGuru.message,
          data:dataGuru.data
        }
        res.status(404).json(response);
      }

    }catch(error){
      res.status(500).json(response500);
    }
  };

  // update guru
exports.updateGuru = async (req, res) => {
  const guruId = req.params.guruId;
  const guruDatas =  req.body;
  try {
        const guruData =  await updateGuru(guruId, guruDatas);
        if(guruData.status == "Sukses"){
          const response = {
            status:guruData.status,
            message:guruData.message,
            data:guruData.data
          }
          res.json(response);
        }else{
          const response = {
            status:guruData.status,
            message:guruData.message,
            data:guruData.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};
