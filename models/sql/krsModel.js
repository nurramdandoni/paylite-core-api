const { Sequelize } = require("sequelize");
const sequelize = require("../../config/db_mysql");

// Definisikan model krs
const Krs = sequelize.define("krs", {
  krs_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  lembaga_pendidikan_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  tahun_ajaran_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  kelas_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  siswa_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  kurikulum_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  status_wali: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  status_pay: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  description: {
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
    tableName: "krs",
  });

// Fungsi untuk menampilkan krs by id
async function findKrsById(krs_id) {
    try {
      const dataKrs = await Krs.findOne({
        where: {
          krs_id: krs_id,
        },
      });
      if (dataKrs != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: dataKrs };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: dataKrs,
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
// Fungsi untuk menampilkan krs all
async function findKrs() {
    try {
      const dataKrs = await Krs.findAll();
      if (dataKrs != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: dataKrs };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: dataKrs,
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
async function createKrs(data) {
    try {
      const dataKrs = await Krs.create({
        lembaga_pendidikan_id: data.lembaga_pendidikan_id,
        tahun_ajaran_id: data.tahun_ajaran_id,
        kelas_id: data.kelas_id,
        siswa_id: data.siswa_id,
        kurikulum_id: data.kurikulum_id,
        status_wali: data.status_wali,
        status_pay: data.status_pay,
        description: data.description
      });
  
      return {
        status: "Sukses",
        message: "Data Berhasil Ditambahkan!",
        data: dataKrs,
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
async function updateKrs(KrsId, data) {
    console.log(data)
  try {
    const dataKrs = await Krs.update(
      {
        lembaga_pendidikan_id: data.lembaga_pendidikan_id,
        tahun_ajaran_id: data.tahun_ajaran_id,
        kelas_id: data.kelas_id,
        siswa_id: data.siswa_id,
        kurikulum_id: data.kurikulum_id,
        status_wali: data.status_wali,
        status_pay: data.status_pay,
        description: data.description
      },
      {
        where: { krs_id: KrsId },
      }
    );

    if (dataKrs[0] > 0) {
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

module.exports = { findKrs, createKrs,findKrsById, updateKrs };
