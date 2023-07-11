const { findProfile } = require('../models/sql/profileModel'); // Core API

const response500 = {
    status:"Error",
    message:"Internal Server Error!",
    data:""
  }

  // user profile
exports.findProfile = async(req, res) => {
    const profile_id = req.params.profile_id;

    try{
        const dataProfile = await findProfile(profile_id);

        if(dataProfile.status == "Sukses"){
            const response = {
                status:dataProfile.status,
                message:dataProfile.message,
                data:dataProfile.data
            }
            res.json(response);
        }else{
            const response = {
                status:dataProfile.status,
                message:dataProfile.message,
                data:dataProfile.data
              }
              res.status(404).json(response);
        }

    }catch(error){
        res.status(500).json(response500);
    }
    
};