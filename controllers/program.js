const { findProgram, createProgram,findProgramById, updateProgram } = require('../models/sql/programModel'); // Core API

const response500 = {
  status:"Error",
  message:"Internal Server Error!",
  data:""
}

// insert program
exports.createProgram = async (req, res) => {
  const data = req.body;
  
  try {
        const dataProgram =  await createProgram(data);
        if(dataProgram.status == "Sukses"){
          const response = {
            status:dataProgram.status,
            message:dataProgram.message,
            data:dataProgram.data
          }
          res.json(response);
        }else{
          const response = {
            status:dataProgram.status,
            message:dataProgram.message,
            data:dataProgram.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};

// get data program all
exports.searchProgram = async (req, res) => {
  try{

    const dataProgram = await findProgram();

    if (dataProgram.status == "Sukses") {
      const response = {
        status:dataProgram.status,
        message:dataProgram.message,
        data:dataProgram.data
      }
      res.json(response);
    } else {
      const response = {
        status:dataProgram.status,
        message:dataProgram.message,
        data:dataProgram.data
      }
      res.status(404).json(response);
    }

  }catch(error){
    res.status(500).json(response500);
  }
};
// get data program by id
exports.findProgramById = async (req, res) => {
    const programId = req.params.programId;

    try{

      const program = await findProgramById(programId);
  
      if (program.status == "Sukses") {
        const response = {
          status:program.status,
          message:program.message,
          data:program.data
        }
        res.json(response);
      } else {
        const response = {
          status:program.status,
          message:program.message,
          data:program.data
        }
        res.status(404).json(response);
      }

    }catch(error){
      res.status(500).json(response500);
    }
  };

  // update program
exports.updateProgram = async (req, res) => {
  const programId = req.params.programId;
  const programDatas =  req.body;
  
  try {
        const programData =  await updateProgram(programId, programDatas);
        if(programData.status == "Sukses"){
          const response = {
            status:programData.status,
            message:programData.message,
            data:programData.data
          }
          res.json(response);
        }else{
          const response = {
            status:programData.status,
            message:programData.message,
            data:programData.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};
