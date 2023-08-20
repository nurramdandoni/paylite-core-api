const { findEduUser, createEduUser,findEduUserById, updateEduUser, findEduUserByWhere } = require('../models/sql/eduUser'); // Core API

const response500 = {
  status:"Error",
  message:"Internal Server Error!",
  data:""
}

// insert edu User
exports.createEduUser = async (req, res) => {
  const data = req.body;
  
  try {
        const eduUser =  await createEduUser(data);
        if(eduUser.status == "Sukses"){
          const response = {
            status:eduUser.status,
            message:eduUser.message,
            data:eduUser.data
          }
          res.json(response);
        }else{
          const response = {
            status:eduUser.status,
            message:eduUser.message,
            data:eduUser.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};

// get data edu User all
exports.searchEduUser = async (req, res) => {
  try{

    const dataEduUser = await findEduUser();

    if (dataEduUser.status == "Sukses") {
      const response = {
        status:dataEduUser.status,
        message:dataEduUser.message,
        data:dataEduUser.data
      }
      res.json(response);
    } else {
      const response = {
        status:dataEduUser.status,
        message:dataEduUser.message,
        data:dataEduUser.data
      }
      res.status(404).json(response);
    }

  }catch(error){
    res.status(500).json(response500);
  }
};
// get data edu user by id
exports.findProgramById = async (req, res) => {
    const eduUserId = req.params.eduUserId;

    try{

      const eduUser = await findEduUserById(eduUserId);
  
      if (eduUser.status == "Sukses") {
        const response = {
          status:eduUser.status,
          message:eduUser.message,
          data:eduUser.data
        }
        res.json(response);
      } else {
        const response = {
          status:eduUser.status,
          message:eduUser.message,
          data:eduUser.data
        }
        res.status(404).json(response);
      }

    }catch(error){
      res.status(500).json(response500);
    }
  };

  // update edu user
exports.updateEduUser = async (req, res) => {
  const eduUserId = req.params.eduUserId;
  const eduUserData =  req.body;
  
  try {
        const eduUserDatas =  await updateEduUser(eduUserId, eduUserData);
        if(eduUserDatas.status == "Sukses"){
          const response = {
            status:eduUserDatas.status,
            message:eduUserDatas.message,
            data:eduUserDatas.data
          }
          res.json(response);
        }else{
          const response = {
            status:eduUserDatas.status,
            message:eduUserDatas.message,
            data:eduUserDatas.data
          }
          res.status(422).json(response);
        }
  } catch (error) {
    res.status(500).json(response500);
  }
};
// get data data edu user by custom
exports.findEduUserByWhere = async (req, res) => {
  const DataWhere = req.body;
console.log(DataWhere)
  try{

    const dataWhere = await findEduUserByWhere(DataWhere);

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