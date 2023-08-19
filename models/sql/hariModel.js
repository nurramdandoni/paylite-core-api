const { Sequelize } = require("sequelize");
const sequelize = require("../../config/db_mysql");

// Definisikan model hari
const Hari = sequelize.define("hari", {
  hari_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  nama_hari: {
    type: Sequelize.STRING,
    allowNull: false,
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
    tableName: "hari",
  });

// Fungsi untuk menampilkan hari by id
async function findHariById(hari_id) {
    try {
      const dataHari = await Hari.findOne({
        where: {
          hari_id: hari_id,
        },
      });
      if (dataHari != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: dataHari };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: dataHari,
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
// Fungsi untuk menampilkan hari all
async function findHari() {
    try {
      const dataHari = await Hari.findAll();
      if (dataHari != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: dataHari };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: dataHari,
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
async function createHari(data) {
    try {
      const dataHari = await Hari.create({
        nama_hari: data.nama_hari
      });
  
      return {
        status: "Sukses",
        message: "Data Berhasil Ditambahkan!",
        data: dataHari,
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
async function updateHari(HariId, data) {
    console.log(data)
  try {
    const dataHari = await Hari.update(
      {
        nama_hari: data.nama_hari
      },
      {
        where: { hari_id: HariId },
      }
    );

    if (dataHari[0] > 0) {
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

module.exports = { findHari, createHari,findHariById, updateHari };
