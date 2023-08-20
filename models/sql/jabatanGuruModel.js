const { Sequelize } = require("sequelize");
const sequelize = require("../../config/db_mysql");

// Definisikan model jabatan guru
const JabatanGuru = sequelize.define("jabatan_guru", {
  jabatan_guru_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  nama_jabatan: {
    type: Sequelize.INTEGER,
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
    tableName: "jabatan_guru",
  });

// Fungsi untuk menampilkan jabatan guru by id
async function findJabatanGuruById(jabatan_guru_id) {
    try {
      const jabatanGuru = await JabatanGuru.findOne({
        where: {
          jabatan_guru_id: jabatan_guru_id,
        },
      });
      if (jabatanGuru != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: jabatanGuru };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: jabatanGuru,
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
// Fungsi untuk menampilkan jabatan guru all
async function findJabatanGuru() {
    try {
      const jabatanGuru = await JabatanGuru.findAll();
      if (jabatanGuru != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: jabatanGuru };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: jabatanGuru,
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
async function createJabatanGuru(data) {
    try {
      const jabatanGuru = await JabatanGuru.create({
        nama_jabatan: data.nama_jabatan
      });
  
      return {
        status: "Sukses",
        message: "Data Berhasil Ditambahkan!",
        data: jabatanGuru,
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
async function updateJabatanGuru(JabatanGuruId, data) {
    console.log(data)
  try {
    const jabatanGuru = await JabatanGuru.update(
      {
        nama_jabatan: data.nama_jabatan
      },
      {
        where: { jabatan_guru_id: JabatanGuruId },
      }
    );

    if (jabatanGuru[0] > 0) {
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

// Fungsi untuk menampilkan jabatan guru by where
async function findJabatanGuruByWhere(whereData) {
  // console.log(whereData)
  try {
    const dataJabatanGuru = await JabatanGuru.findAll({
      where: whereData,
    });
    if (dataJabatanGuru != null) {
      return { status: "Sukses", message: "Data Ditemukan!", data: dataJabatanGuru };
    } else {
      return {
        status: "Error",
        message: "Data Tidak Ditemukan!",
        data: dataJabatanGuru,
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

module.exports = { findJabatanGuru, createJabatanGuru,findJabatanGuruById, updateJabatanGuru, findJabatanGuruByWhere };
