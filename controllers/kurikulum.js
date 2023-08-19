const { findKurikulum, createKurikulum,findKurikulumById, updateKurikulum, findKurikulumByWhere } = require('../models/sql/kurikulumModel'); // Core API

const response500 = {
  status:"Error",
  message:"Internal Server Error!",
  data:""
}

// insert kurikulum
exports.createKurikulum = async (req, res) => {
  const data = req.body;
  
  try {
        const dataKurikulum =  await createKurikulum(data);
        if(dataKurikulum.status == "Sukses"){
          const response = {
            status:dataKurikulum.status,
            message:dataKurikulum.message,
            data:dataKurikulum.data
          }
          res.json(response);
        }else{
          const response = {
            status:dataKurikulum.status,
            message:dataKurikulum.message,
            data:dataKurikulum.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};

// get data kurikulum all
exports.searchKurikulum = async (req, res) => {
  try{

    const dataKurikulum = await findKurikulum();

    if (dataKurikulum.status == "Sukses") {
      const response = {
        status:dataKurikulum.status,
        message:dataKurikulum.message,
        data:dataKurikulum.data
      }
      res.json(response);
    } else {
      const response = {
        status:dataKurikulum.status,
        message:dataKurikulum.message,
        data:dataKurikulum.data
      }
      res.status(404).json(response);
    }

  }catch(error){
    res.status(500).json(response500);
  }
};
// get data kurikulum by id
exports.findKurikulumById = async (req, res) => {
    const KurikulumId = req.params.kurikulumId;

    try{

      const dataKurikulum = await findKurikulumById(KurikulumId);
  
      if (dataKurikulum.status == "Sukses") {
        const response = {
          status:dataKurikulum.status,
          message:dataKurikulum.message,
          data:dataKurikulum.data
        }
        res.json(response);
      } else {
        const response = {
          status:dataKurikulum.status,
          message:dataKurikulum.message,
          data:dataKurikulum.data
        }
        res.status(404).json(response);
      }

    }catch(error){
      res.status(500).json(response500);
    }
  };

  // update kurikulum
exports.updateKurikulum = async (req, res) => {
  const kurikulumId = req.params.kurikulumId;
  const kurikulumDatas =  req.body;
  try {
        const kurikulumData =  await updateKurikulum(kurikulumId, kurikulumDatas);
        if(kurikulumData.status == "Sukses"){
          const response = {
            status:kurikulumData.status,
            message:kurikulumData.message,
            data:kurikulumData.data
          }
          res.json(response);
        }else{
          const response = {
            status:kurikulumData.status,
            message:kurikulumData.message,
            data:kurikulumData.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};

// get data kurikulum by custom
exports.findKurikulumByWhere = async (req, res) => {
    const KurikulumWhere = req.body;
console.log(KurikulumWhere)
    try{

      const dataKurikulum = await findKurikulumByWhere(KurikulumWhere);
  
      if (dataKurikulum.status == "Sukses") {
        const response = {
          status:dataKurikulum.status,
          message:dataKurikulum.message,
          data:dataKurikulum.data
        }
        res.json(response);
      } else {
        const response = {
          status:dataKurikulum.status,
          message:dataKurikulum.message,
          data:dataKurikulum.data
        }
        res.status(404).json(response);
      }

    }catch(error){
      res.status(500).json(response500);
    }
  };
