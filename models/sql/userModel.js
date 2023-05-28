const { Sequelize } = require('sequelize');
const sequelize = require('../../config/db_mysql');

// Definisikan model User
const User = sequelize.define('users', {
    user_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    role: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
  });
  
// Fungsi untuk menampilkan User
async function loginProses(username, password) {
    try {
        const users = await User.findOne({
            where: {
              username: username,
              password: password,
            },
        });
      if (users != null) {
        return { status: "Sukses", message: "Login Berhasil!", data: users };
      } else {
        return { status: "Error", message: "Login Gagal!", data: users };
      }
    } catch (error) {
      console.error(error);
      return { status: "Error", message: "Terjadi Kesalahan!", data: error.message };
    }
  }
module.exports = { loginProses };
