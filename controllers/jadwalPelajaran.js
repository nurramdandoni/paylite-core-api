const { findJadwalPelajaran, createJadwalPelajaran,findJadwalPelajaranById, updateJadwalPelajaran, findJadwalPelajaranByWhere } = require('../models/sql/jadwalPelajaranModel'); // Core API

const response500 = {
  status:"Error",
  message:"Internal Server Error!",
  data:""
}

// insert data jadwal pelajaran
exports.createJadwalPelajaran = async (req, res) => {
  const data = req.body;
  
  try {
        const dataJadwalPelajaran =  await createJadwalPelajaran(data);
        if(dataJadwalPelajaran.status == "Sukses"){
          const response = {
            status:dataJadwalPelajaran.status,
            message:dataJadwalPelajaran.message,
            data:dataJadwalPelajaran.data
          }
          res.json(response);
        }else{
          const response = {
            status:dataJadwalPelajaran.status,
            message:dataJadwalPelajaran.message,
            data:dataJadwalPelajaran.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};

// get data jadwal pelajaran all
exports.searchJadwalPelajaran = async (req, res) => {
  try{

    const dataJadwalPelajaran = await findJadwalPelajaran();

    if (dataJadwalPelajaran.status == "Sukses") {
      const response = {
        status:dataJadwalPelajaran.status,
        message:dataJadwalPelajaran.message,
        data:dataJadwalPelajaran.data
      }
      res.json(response);
    } else {
      const response = {
        status:dataJadwalPelajaran.status,
        message:dataJadwalPelajaran.message,
        data:dataJadwalPelajaran.data
      }
      res.status(404).json(response);
    }

  }catch(error){
    res.status(500).json(response500);
  }
};
// get data jadwal pelajaran by id
exports.findJadwalPelajaranById = async (req, res) => {
    const JadwalPelajaranId = req.params.jadwalPelajaranId;

    try{

      const dataJadwalPelajaran = await findJadwalPelajaranById(JadwalPelajaranId);
  
      if (dataJadwalPelajaran.status == "Sukses") {
        const response = {
          status:dataJadwalPelajaran.status,
          message:dataJadwalPelajaran.message,
          data:dataJadwalPelajaran.data
        }
        res.json(response);
      } else {
        const response = {
          status:dataJadwalPelajaran.status,
          message:dataJadwalPelajaran.message,
          data:dataJadwalPelajaran.data
        }
        res.status(404).json(response);
      }

    }catch(error){
      res.status(500).json(response500);
    }
  };

  // update jadwal pelajaran
exports.updateJadwalPelajaran = async (req, res) => {
  const JadwalPelajaranId = req.params.jadwalPelajaranId;
  const jadwal_pelajaranDatas =  req.body;
  try {
        const jadwal_pelajaranData =  await updateJadwalPelajaran(JadwalPelajaranId, jadwal_pelajaranDatas);
        if(jadwal_pelajaranData.status == "Sukses"){
          const response = {
            status:jadwal_pelajaranData.status,
            message:jadwal_pelajaranData.message,
            data:jadwal_pelajaranData.data
          }
          res.json(response);
        }else{
          const response = {
            status:jadwal_pelajaranData.status,
            message:jadwal_pelajaranData.message,
            data:jadwal_pelajaranData.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};
// get data jadwal pelajaran by custom
exports.findJadwalPelajaranByWhere = async (req, res) => {
    const DataWhere = req.body;
  console.log(DataWhere)
    try{
  
      const dataWhere = await findJadwalPelajaranByWhere(DataWhere);
  
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