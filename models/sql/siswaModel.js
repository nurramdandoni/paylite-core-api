const { Sequelize } = require("sequelize");
const sequelize = require("../../config/db_mysql");

// Definisikan model siswa
const Siswa = sequelize.define("siswa", {
  siswa_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  lembaga_pendidikan_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  nisn: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email_orang_tua: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  nama_siswa: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  jenis_kelamin_id: {
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
    tableName: "siswa",
  });

// Fungsi untuk menampilkan siswa by id
async function findSiswaById(siswa_id) {
    try {
      const siswa = await Siswa.findOne({
        where: {
          siswa_id: siswa_id,
        },
      });
      if (siswa != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: siswa };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: siswa,
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
// Fungsi untuk menampilkan siswa all
async function findSiswa() {
    try {
      const siswa = await Siswa.findAll();
      if (siswa != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: siswa };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: siswa,
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
async function createSiswa(data) {
    try {
      const siswa = await Siswa.create({
        lembaga_pendidikan_id: data.lembaga_pendidikan_id,
        nisn: data.nisn,
        email: data.email,
        email_orang_tua: data.email_orang_tua,
        nama_siswa: data.nama_siswa,
        jenis_kelamin_id: data.jenis_kelamin_id
      });
  
      return {
        status: "Sukses",
        message: "Data Berhasil Ditambahkan!",
        data: siswa,
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
async function updateSiswa(SiswaId, data) {
    console.log(data)
  try {
    const siswa = await Siswa.update(
      {
        lembaga_pendidikan_id: data.lembaga_pendidikan_id,
        nisn: data.nisn,
        email: data.email,
        email_orang_tua: data.email_orang_tua,
        nama_siswa: data.nama_siswa,
        jenis_kelamin_id: data.jenis_kelamin_id
      },
      {
        where: { siswa_id: SiswaId },
      }
    );

    if (siswa[0] > 0) {
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

module.exports = { findSiswa, createSiswa,findSiswaById, updateSiswa };
