const { Sequelize } = require("sequelize");
const sequelize = require("../../config/db_mysql");

// Definisikan model programs
const EduUser = sequelize.define("edu_users", {
  edu_user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  subscriber_id: {
    type: Sequelize.INTEGER,     
    allowNull: false,
  },
  lembaga_pendidikan_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  }, 
  },
  {
    tableName: "edu_users",
  });

// Fungsi untuk menampilkan paylite edu user by id
async function findEduUserById(edu_user_id) {
    try {
      const edu_user = await EduUser.findOne({
        where: {
          edu_user_id: edu_user_id,
        },
      });
      if (edu_user != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: edu_user };
      } else {
        return {
          status: "Error",
          message: "Role Tidak Ditemukan!",
          data: edu_user,
        };
      }
    } catch (error) {
      console.error("error ", error);
      return {
        status: "Error",
        message: "Terjadi Kesalahan Saat Proses Data!",
        data: error.message,
      };
    }
  }
// Fungsi untuk menampilkan paylite edu user all
async function findEduUser() {
    try {
      const edu_user = await EduUser.findAll();
      if (edu_user != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: edu_user };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: edu_user,
        };
      }
    } catch (error) {
      console.error("error ", error);
      return {
        status: "Error",
        message: "Terjadi Kesalahan Saat Proses Data!",
        data: error.message,
      };
    }
  }
// Menyisipkan data baru
async function createEduUser(data) {
    try {
      const edu_user = await EduUser.create({
        subscriber_id:data.subscriber_id,
        lembaga_pendidikan_id:data.lembaga_pendidikan_id
      });
  
      return {
        status: "Sukses",
        message: "Data Produk Berhasil Ditambahkan!",
        data: edu_user,
      };
    } catch (error) {
      console.error(error);
      return {
        status: "Error",
        message: "Terjadi Kesalahan Saat Menambahkan Data!",
        data: error.message,
      };
    }
  }
// Memperbarui data
async function updateEduUser(EduUserId, data) {
    console.log(data)
  try {
    const edu_user = await EduUser.update(
      {
        subscriber_id:data.subscriber_id,
        lembaga_pendidikan_id:data.lembaga_pendidikan_id
      },
      {
        where: { edu_user_id: EduUserId },
      }
    );

    if (edu_user[0] > 0) {
      return { status: "Sukses", message: "Data Produk Berhasil Diperbaharui!" };
    } else {
      return { status: "Error", message: "Data Tidak Ditemukan!" };
    }
  } catch (error) {
    console.error(error);
    return {
      status: "Error",
      message: "Terjadi Kesalahan Saat Memperbarui Data!",
      data: error.message,
    };
  }
}

module.exports = { findEduUser, createEduUser,findEduUserById, updateEduUser };
