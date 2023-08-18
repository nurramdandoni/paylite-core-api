const { findJenjangPendidikan, createJenjangPendidikan,findJenjangPendidikanById, updateJenjangPendidikan } = require('../models/sql/jenjangPendidikanModel'); // Core API

const response500 = {
  status:"Error",
  message:"Internal Server Error!",
  data:""
}

// insert jenjang pendidikan
exports.createJenjangPendidikan = async (req, res) => {
  const data = req.body;
  
  try {
        const dataJenjangPendidikan =  await createJenjangPendidikan(data);
        if(dataJenjangPendidikan.status == "Sukses"){
          const response = {
            status:dataJenjangPendidikan.status,
            message:dataJenjangPendidikan.message,
            data:dataJenjangPendidikan.data
          }
          res.json(response);
        }else{
          const response = {
            status:dataJenjangPendidikan.status,
            message:dataJenjangPendidikan.message,
            data:dataJenjangPendidikan.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};

// get data jenjang pendidikan all
exports.searchJenjangPendidikan = async (req, res) => {
  try{

    const dataJenjangPendidikan = await findJenjangPendidikan();

    if (dataJenjangPendidikan.status == "Sukses") {
      const response = {
        status:dataJenjangPendidikan.status,
        message:dataJenjangPendidikan.message,
        data:dataJenjangPendidikan.data
      }
      res.json(response);
    } else {
      const response = {
        status:dataJenjangPendidikan.status,
        message:dataJenjangPendidikan.message,
        data:dataJenjangPendidikan.data
      }
      res.status(404).json(response);
    }

  }catch(error){
    res.status(500).json(response500);
  }
};
// get data jenjang pendidikan by id
exports.findJenjangPendidikanById = async (req, res) => {
    const jenjangPendidikanId = req.params.jenjangPendidikanId;

    try{

      const jenjangPendidikan = await findJenjangPendidikanById(jenjangPendidikanId);
  
      if (jenjangPendidikan.status == "Sukses") {
        const response = {
          status:jenjangPendidikan.status,
          message:jenjangPendidikan.message,
          data:jenjangPendidikan.data
        }
        res.json(response);
      } else {
        const response = {
          status:jenjangPendidikan.status,
          message:jenjangPendidikan.message,
          data:jenjangPendidikan.data
        }
        res.status(404).json(response);
      }

    }catch(error){
      res.status(500).json(response500);
    }
  };

  // update jenjang pendidikan
exports.updateJenjangPendidikan = async (req, res) => {
  const jenjangPendidikanId = req.params.jenjangPendidikanId;
  const jenjangPendidikanDatas =  req.body;
  
  try {
        const jenjangPendidikanData =  await updateJenjangPendidikan(jenjangPendidikanId, jenjangPendidikanDatas);
        if(jenjangPendidikanData.status == "Sukses"){
          const response = {
            status:jenjangPendidikanData.status,
            message:jenjangPendidikanData.message,
            data:jenjangPendidikanData.data
          }
          res.json(response);
        }else{
          const response = {
            status:jenjangPendidikanData.status,
            message:jenjangPendidikanData.message,
            data:jenjangPendidikanData.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};
