const { Sequelize } = require("sequelize");
const sequelize = require("../../config/db_mysql");

// Definisikan model nilai
const Nilai = sequelize.define("nilai", {
    nilai_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  jadwal_pelajaran_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  siswa_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  kehadiran: {
    type: Sequelize.DOUBLE,
    allowNull: true,
  },
  tugas: {
    type: Sequelize.DOUBLE,
    allowNull: true,
  },
  uts: {
    type: Sequelize.DOUBLE,
    allowNull: true,
  },
  uas: {
    type: Sequelize.DOUBLE,
    allowNull: true,
  },
  praktek: {
    type: Sequelize.DOUBLE,
    allowNull: true,
  },
  nilai: {
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
    tableName: "nilai",
  });

// Fungsi untuk menampilkan nilai by id
async function findNilaiById(nilai_id) {
    try {
      const dataNilai = await Nilai.findOne({
        where: {
          nilai_id: nilai_id,
        },
      });
      if (dataNilai != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: dataNilai };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: dataNilai,
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
// Fungsi untuk menampilkan NIlai all
async function findNilai() {
    try {
      const dataNilai = await Nilai.findAll();
      if (dataNilai != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: dataNilai };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: dataNilai,
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
async function createNilai(data) {
    try {
      const dataNilai = await Nilai.create({
        jadwal_pelajaran_id: data.jadwal_pelajaran_id,
        siswa_id: data.siswa_id,
        kehadiran: data.kehadiran,
        tugas: data.tugas,
        uts: data.uts,
        uas: data.uas,
        praktek: data.praktek,
        nilai: data.nilai
      });
  
      return {
        status: "Sukses",
        message: "Data Berhasil Ditambahkan!",
        data: dataNilai,
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
async function updateNilai(NilaiId, data) {
    console.log(data)
  try {
    const dataNilai = await Nilai.update(
      {
        jadwal_pelajaran_id: data.jadwal_pelajaran_id,
        siswa_id: data.siswa_id,
        kehadiran: data.kehadiran,
        tugas: data.tugas,
        uts: data.uts,
        uas: data.uas,
        praktek: data.praktek,
        nilai: data.nilai
      },
      {
        where: { nilai_id: NilaiId },
      }
    );

    if (dataNilai[0] > 0) {
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

// Fungsi untuk menampilkan nilai by where
async function findNilaiByWhere(whereData) {
    // console.log(whereData)
    try {
      const dataNilai = await Nilai.findAll({
        where: whereData,
      });
      if (dataNilai != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: dataNilai };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: dataNilai,
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

module.exports = { findNilai, createNilai,findNilaiById, updateNilai, findNilaiByWhere };
