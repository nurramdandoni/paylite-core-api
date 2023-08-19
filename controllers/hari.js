const { findHari, createHari,findHariById, updateHari } = require('../models/sql/hariModel'); // Core API

const response500 = {
  status:"Error",
  message:"Internal Server Error!",
  data:""
}

// insert data hari
exports.createHari = async (req, res) => {
  const data = req.body;
  
  try {
        const dataHari =  await createHari(data);
        if(dataHari.status == "Sukses"){
          const response = {
            status:dataHari.status,
            message:dataHari.message,
            data:dataHari.data
          }
          res.json(response);
        }else{
          const response = {
            status:dataHari.status,
            message:dataHari.message,
            data:dataHari.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};

// get data hari all
exports.searchHari = async (req, res) => {
  try{

    const dataHari = await findHari();

    if (dataHari.status == "Sukses") {
      const response = {
        status:dataHari.status,
        message:dataHari.message,
        data:dataHari.data
      }
      res.json(response);
    } else {
      const response = {
        status:dataHari.status,
        message:dataHari.message,
        data:dataHari.data
      }
      res.status(404).json(response);
    }

  }catch(error){
    res.status(500).json(response500);
  }
};
// get data hari by id
exports.findHariById = async (req, res) => {
    const HariId = req.params.hariId;

    try{

      const dataHari = await findHariById(HariId);
  
      if (dataHari.status == "Sukses") {
        const response = {
          status:dataHari.status,
          message:dataHari.message,
          data:dataHari.data
        }
        res.json(response);
      } else {
        const response = {
          status:dataHari.status,
          message:dataHari.message,
          data:dataHari.data
        }
        res.status(404).json(response);
      }

    }catch(error){
      res.status(500).json(response500);
    }
  };

  // update hari
exports.updateHari = async (req, res) => {
  const HariId = req.params.hariId;
  const hariDatas =  req.body;
  try {
        const dataHari =  await updateHari(HariId, hariDatas);
        if(dataHari.status == "Sukses"){
          const response = {
            status:dataHari.status,
            message:dataHari.message,
            data:dataHari.data
          }
          res.json(response);
        }else{
          const response = {
            status:dataHari.status,
            message:dataHari.message,
            data:dataHari.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};
