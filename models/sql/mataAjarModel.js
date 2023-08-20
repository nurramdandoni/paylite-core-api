const { Sequelize } = require("sequelize");
const sequelize = require("../../config/db_mysql");

// Definisikan model mata ajar
const MataAjar = sequelize.define("mata_ajar", {
  mata_ajar_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  lembaga_pendidikan_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  nama_mata_ajar: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  bobot_sks: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  status: {
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
    tableName: "mata_ajar",
  });

// Fungsi untuk menampilkan mata ajara by id
async function findMataAjarById(mata_ajar_id) {
    try {
      const mataAjar = await MataAjar.findOne({
        where: {
          mata_ajar_id: mata_ajar_id,
        },
      });
      if (mataAjar != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: mataAjar };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: mataAjar,
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
// Fungsi untuk menampilkan mata ajar all
async function findMataAjar() {
    try {
      const mataAjar = await MataAjar.findAll();
      if (mataAjar != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: mataAjar };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: mataAjar,
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
async function createMataAjar(data) {
    try {
      const mataAjar = await MataAjar.create({
        lembaga_pendidikan_id: data.lembaga_pendidikan_id,
        nama_mata_ajar: data.nama_mata_ajar,
        bobot_sks: data.bobot_sks,
        description: data.description,
        status: data.status
      });
  
      return {
        status: "Sukses",
        message: "Data Berhasil Ditambahkan!",
        data: mataAjar,
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
async function updateMataAjar(MataAjarId, data) {
    console.log(data)
  try {
    const mataAjar = await MataAjar.update(
      {
        lembaga_pendidikan_id: data.lembaga_pendidikan_id,
        nama_mata_ajar: data.nama_mata_ajar,
        bobot_sks: data.bobot_sks,
        description: data.description,
        status: data.status
      },
      {
        where: { mata_ajar_id: MataAjarId },
      }
    );

    if (mataAjar[0] > 0) {
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

// Fungsi untuk menampilkan mata ajar by where
async function findMataAjarByWhere(whereData) {
  // console.log(whereData)
  try {
    const dataMataAjar = await MataAjar.findAll({
      where: whereData,
    });
    if (dataMataAjar != null) {
      return { status: "Sukses", message: "Data Ditemukan!", data: dataMataAjar };
    } else {
      return {
        status: "Error",
        message: "Data Tidak Ditemukan!",
        data: dataMataAjar,
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

module.exports = { findMataAjar, createMataAjar,findMataAjarById, updateMataAjar, findMataAjarByWhere };
