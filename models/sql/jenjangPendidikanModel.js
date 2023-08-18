const { Sequelize } = require("sequelize");
const sequelize = require("../../config/db_mysql");

// Definisikan model jenjang pendidikan
const JenjangPendidikan = sequelize.define("jenjang_pendidikan", {
  jenjang_pendidikan_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  nama_jenjang: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  status: {
    type: Sequelize.STRING,
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
    tableName: "jenjang_pendidikan",
  });

// Fungsi untuk menampilkan jenjang pendidikan by id
async function findJenjangPendidikanById(jenjang_pendidikan_id) {
    try {
      const jenjang_pendidikan = await JenjangPendidikan.findOne({
        where: {
          jenjang_pendidikan_id: jenjang_pendidikan_id,
        },
      });
      if (jenjang_pendidikan != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: jenjang_pendidikan };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: jenjang_pendidikan,
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
// Fungsi untuk menampilkan jenjang pendidikan all
async function findJenjangPendidikan() {
    try {
      const jenjang_pendidikan = await JenjangPendidikan.findAll();
      if (jenjang_pendidikan != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: jenjang_pendidikan };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: jenjang_pendidikan,
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
async function createJenjangPendidikan(data) {
    try {
      const jenjang_pendidikan = await JenjangPendidikan.create({
        jenjang_pendidikan_id:data.jenjang_pendidikan_id,
        nama_jenjang:data.nama_jenjang,
        description:data.description,
        status:data.status,
      });
  
      return {
        status: "Sukses",
        message: "Data Produk Berhasil Ditambahkan!",
        data: jenjang_pendidikan,
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
async function updateJenjangPendidikan(JenjangPendidikanId, data) {
    console.log(data)
  try {
    const jenjang_pendidikan = await JenjangPendidikan.update(
      {
        jenjang_pendidikan_id:data.jenjang_pendidikan_id,
        nama_jenjang:data.nama_jenjang,
        description:data.description,
        status:data.status,
      },
      {
        where: { jenjang_pendidikan_id: JenjangPendidikanId },
      }
    );

    if (jenjang_pendidikan[0] > 0) {
      return { status: "Sukses", message: "Data Berhasil Diperbaharui!" };
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

module.exports = { findJenjangPendidikan, createJenjangPendidikan,findJenjangPendidikanById, updateJenjangPendidikan };
