const { findSiswa, createSiswa,findSiswaById, updateSiswa } = require('../models/sql/siswaModel'); // Core API

const response500 = {
  status:"Error",
  message:"Internal Server Error!",
  data:""
}

// insert siswa
exports.createSiswa = async (req, res) => {
  const data = req.body;
  
  try {
        const dataSiswa =  await createSiswa(data);
        if(dataSiswa.status == "Sukses"){
          const response = {
            status:dataSiswa.status,
            message:dataSiswa.message,
            data:dataSiswa.data
          }
          res.json(response);
        }else{
          const response = {
            status:dataSiswa.status,
            message:dataSiswa.message,
            data:dataSiswa.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};

// get data siswa all
exports.searchSiswa = async (req, res) => {
  try{

    const dataSiswa = await findSiswa();

    if (dataSiswa.status == "Sukses") {
      const response = {
        status:dataSiswa.status,
        message:dataSiswa.message,
        data:dataSiswa.data
      }
      res.json(response);
    } else {
      const response = {
        status:dataSiswa.status,
        message:dataSiswa.message,
        data:dataSiswa.data
      }
      res.status(404).json(response);
    }

  }catch(error){
    res.status(500).json(response500);
  }
};
// get data siswa by id
exports.findSiswaById = async (req, res) => {
    const SiswaId = req.params.siswaId;

    try{

      const dataSiswa = await findSiswaById(SiswaId);
  
      if (dataSiswa.status == "Sukses") {
        const response = {
          status:dataSiswa.status,
          message:dataSiswa.message,
          data:dataSiswa.data
        }
        res.json(response);
      } else {
        const response = {
          status:dataSiswa.status,
          message:dataSiswa.message,
          data:dataSiswa.data
        }
        res.status(404).json(response);
      }

    }catch(error){
      res.status(500).json(response500);
    }
  };

  // update siswa
exports.updateSiswa = async (req, res) => {
  const siswaId = req.params.siswaId;
  const siswaDatas =  req.body;
  try {
        const siswaData =  await updateSiswa(siswaId, siswaDatas);
        if(siswaData.status == "Sukses"){
          const response = {
            status:siswaData.status,
            message:siswaData.message,
            data:siswaData.data
          }
          res.json(response);
        }else{
          const response = {
            status:siswaData.status,
            message:siswaData.message,
            data:siswaData.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};
