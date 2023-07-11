const jwtLib = require('../config/jwt');
const crypto = require('crypto');

const { loginProses, loginOauth2, insertUser } = require('../models/sql/userModel'); // Core API
const { insertProfile } = require('../models/sql/profileModel'); // Core API

const response500 = {
    status:"Error",
    message:"Internal Server Error!",
    data:""
  }

// user login
exports.searchUser = async(req, res) => {
    const data = req.body;
    const username = data.username
    console.log("request",data);

    const hashedPassword = crypto.createHash('sha1').update(data.password).digest('hex');
    try{
        let dataUser;
        if(data.signWithGoogle){

            dataUser = await loginOauth2(data.username);
            console.log("kesini");
        }else{
            
            dataUser = await loginProses(data.username, hashedPassword);
        }

        if(dataUser.status == "Sukses"){
            // data dari Oauth2 digunakan untuk :
            // update profile terbaru setiap login nama, email, lokasi

            // Jika otentikasi berhasil, membuat token JWT
            const token = jwtLib.jwt.sign({ username }, jwtLib.secretKey,{ expiresIn: '1d' });
            const response = {
                status:dataUser.status,
                message:dataUser.message,
                data:{
                    user_id:dataUser.data.user_id,
                    username:data.username,
                    role:data.role,
                    profile_id:dataUser.data.profile_id,
                    token:token

                }
            }
            res.json(response);
        }else{
            // data dari Oauth2 digunakan untuk :
            // membuat profile baru
            const dataProfile = await insertProfile(data);
            console.log(dataProfile.data);
            const newUser = {
                username:data.username,
                password:hashedPassword,
                role:data.role,
                profile_id:dataProfile.data.profile_id
            }
            console.log("new User : ",newUser);
            const dataUser = await insertUser(newUser);
            // membuat user baru
            // Jika registrasi berhasil, membuat token JWT
            const token = jwtLib.jwt.sign({ username }, jwtLib.secretKey,{ expiresIn: '1d' });
            const response = {
                status:dataUser.status,
                message:"Login Berhasil!",
                data:{
                    user_id:dataUser.data.user_id,
                    username:data.username,
                    role:data.role,
                    profile_id:dataProfile.data.profile_id,
                    token:token

                }
              }
            //   res.status(404).json(response);
              res.json(response);
        }

    }catch(error){
        res.status(500).json(response500);
    }
    
};