const { findJadwalPelajaran, createJadwalPelajaran,findJadwalPelajaranById, updateJadwalPelajaran, findJadwalPelajaranByWhere, findJadwalPelajaranJoin, findJadwalPelajaranJoinByKrsNisn, findJadwalPelajaranBentrok, findJadwalPelajaranByGroupReport } = require('../models/sql/jadwalPelajaranModel'); // Core API

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

  // get data jadwal pelajaran by custom
exports.findJadwalPelajaranByGroupReport = async (req, res) => {
  const DataWhere = req.body;
  const where = DataWhere.where;
  const column = DataWhere.column;
console.log(DataWhere)
  try{

    const dataWhere = await findJadwalPelajaranByGroupReport(where,column);

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
// get data jadwal pelajaran by join
exports.findJadwalPelajaranJoin = async (req, res) => {
  const lembagaPendidikan = req.params.lembagaPendidikan;
  console.log(lembagaPendidikan)
    try{
  
      const dataJadwalPelajaran = await findJadwalPelajaranJoin(lembagaPendidikan);
  
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
// get data jadwal pelajaran by join krs with nisn
exports.findJadwalPelajaranJoinByKrsNisn = async (req, res) => {
  const DataWhere = req.body;
  const idLembaga = DataWhere.lembaga_pendidikan_id;
  const hari = DataWhere.hari_id;
  const nisn = DataWhere.nisn;
  const waktu = DataWhere.waktu;
  console.log(DataWhere)
  console.log("ini lemmbbaga id :", idLembaga);
    try{
  
      const dataJadwalPelajaran = await findJadwalPelajaranJoinByKrsNisn(idLembaga,hari,nisn,waktu);
  
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
// get data jadwal pelajaran bentrok by jam
exports.findJadwalPelajaranBentrok = async (req, res) => {
  const DataWhere = req.body;
  const idLembaga = DataWhere.lembaga_pendidikan_id;
  const hari = DataWhere.hari_id;
  const guru = DataWhere.guru_id;
  const waktu_mulai = DataWhere.waktu_mulai;
  const waktu_selesai = DataWhere.waktu_selesai;
  console.log(DataWhere)
  console.log("ini lemmbbaga id :", idLembaga);
    try{
  
      const dataJadwalPelajaran = await findJadwalPelajaranBentrok(idLembaga,hari,guru,waktu_mulai,waktu_selesai);
  
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