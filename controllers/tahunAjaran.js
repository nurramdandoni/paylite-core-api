const { findTahunAjaran, createTahunAjaran,findTahunAjaranById, updateTahunAjaran, findTahunAjaranByWhere } = require('../models/sql/tahunAjaranModel'); // Core API

const response500 = {
  status:"Error",
  message:"Internal Server Error!",
  data:""
}

// insert tahun ajaran
exports.createTahunAjaran = async (req, res) => {
  const data = req.body;
  
  try {
        const dataTahunAjaran =  await createTahunAjaran(data);
        if(dataTahunAjaran.status == "Sukses"){
          const response = {
            status:dataTahunAjaran.status,
            message:dataTahunAjaran.message,
            data:dataTahunAjaran.data
          }
          res.json(response);
        }else{
          const response = {
            status:dataTahunAjaran.status,
            message:dataTahunAjaran.message,
            data:dataTahunAjaran.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};

// get data tahun ajaran all
exports.searchTahunAjaran = async (req, res) => {
  try{

    const dataTahunAjaran = await findTahunAjaran();

    if (dataTahunAjaran.status == "Sukses") {
      const response = {
        status:dataTahunAjaran.status,
        message:dataTahunAjaran.message,
        data:dataTahunAjaran.data
      }
      res.json(response);
    } else {
      const response = {
        status:dataTahunAjaran.status,
        message:dataTahunAjaran.message,
        data:dataTahunAjaran.data
      }
      res.status(404).json(response);
    }

  }catch(error){
    res.status(500).json(response500);
  }
};
// get data tahun ajaran by id
exports.findTahunAjaranById = async (req, res) => {
    const TahunAjaranId = req.params.tahunAjaranId;

    try{

      const dataTahunAjaran = await findTahunAjaranById(TahunAjaranId);
  
      if (dataTahunAjaran.status == "Sukses") {
        const response = {
          status:dataTahunAjaran.status,
          message:dataTahunAjaran.message,
          data:dataTahunAjaran.data
        }
        res.json(response);
      } else {
        const response = {
          status:dataTahunAjaran.status,
          message:dataTahunAjaran.message,
          data:dataTahunAjaran.data
        }
        res.status(404).json(response);
      }

    }catch(error){
      res.status(500).json(response500);
    }
  };

  // update tahun ajaran
exports.updateTahunAjaran = async (req, res) => {
  const tahuAjaranId = req.params.tahunAjaranId;
  const tahunAjaranDatas =  req.body;
  console.log(tahunAjaranDatas)
  console.log(tahuAjaranId)
  try {
        const tahunAjaranData =  await updateTahunAjaran(tahuAjaranId, tahunAjaranDatas);
        if(tahunAjaranData.status == "Sukses"){
          const response = {
            status:tahunAjaranData.status,
            message:tahunAjaranData.message,
            data:tahunAjaranData.data
          }
          res.json(response);
        }else{
          const response = {
            status:tahunAjaranData.status,
            message:tahunAjaranData.message,
            data:tahunAjaranData.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};
// get tahun ajaran by custom
exports.findTahunAjaranByWhere = async (req, res) => {
  const DataWhere = req.body;
console.log(DataWhere)
  try{

    const dataWhere = await findTahunAjaranByWhere(DataWhere);

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