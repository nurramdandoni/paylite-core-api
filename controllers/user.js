const jwtLib = require('../config/jwt');
const crypto = require('crypto');

const { loginProses } = require('../models/sql/userModel'); // Core API

const response500 = {
    status:"Error",
    message:"Internal Server Error!",
    data:""
  }

// user login
exports.searchUser = async(req, res) => {
    const { username, password } = req.body;

    const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');
    try{
        const dataUser = await loginProses(username, hashedPassword);

        if(dataUser.status == "Sukses"){
            // Jika otentikasi berhasil, membuat token JWT
            const token = jwtLib.jwt.sign({ username }, jwtLib.secretKey,{ expiresIn: '1d' });
            const response = {
                status:dataUser.status,
                message:dataUser.message,
                data:dataUser.data,
                token:token
            }
            res.json(response);
        }else{
            const response = {
                status:dataUser.status,
                message:dataUser.message,
                data:dataUser.data
              }
              res.status(404).json(response);
        }

    }catch(error){
        res.status(500).json(response500);
    }
    
};