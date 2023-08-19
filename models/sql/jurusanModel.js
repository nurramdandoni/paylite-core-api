const { Sequelize } = require("sequelize");
const sequelize = require("../../config/db_mysql");

// Definisikan model jurusan
const Jurusan = sequelize.define("jurusan", {
  jurusan_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  lembaga_pendidikan_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  nomor_legalitas: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  sk_akreditasi: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  nama_jurusan: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  kepala_jurusan: {
    type: Sequelize.STRING,
    allowNull: false,
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
    tableName: "jurusan",
  });

// Fungsi untuk menampilkan jurusan by id
async function findJurusanById(jurusan_id) {
    try {
      const jurusan = await Jurusan.findOne({
        where: {
          jurusan_id: jurusan_id,
        },
      });
      if (jurusan != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: jurusan };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: jurusan,
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
// Fungsi untuk menampilkan jurusan all
async function findJurusan() {
    try {
      const jurusan = await Jurusan.findAll();
      if (jurusan != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: jurusan };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: jurusan,
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
async function createJurusan(data) {
    try {
      const jurusan = await Jurusan.create({
        lembaga_pendidikan_id: data.lembaga_pendidikan_id,
        nomor_legalitas: data.nomor_legalitas,
        sk_akreditasi: data.sk_akreditasi,
        nama_jurusan: data.nama_jurusan,
        kepala_jurusan: data.kepala_jurusan,
        description: data.description,
        status: data.status
      });
  
      return {
        status: "Sukses",
        message: "Data Produk Berhasil Ditambahkan!",
        data: jurusan,
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
async function updateJurusan(JurusanId, data) {
    console.log(data)
  try {
    const jurusan = await Jurusan.update(
      {
        lembaga_pendidikan_id: data.lembaga_pendidikan_id,
        nomor_legalitas: data.nomor_legalitas,
        sk_akreditasi: data.sk_akreditasi,
        nama_jurusan: data.nama_jurusan,
        kepala_jurusan: data.kepala_jurusan,
        description: data.description,
        status: data.status
      },
      {
        where: { jurusan_id: JurusanId },
      }
    );

    if (jurusan[0] > 0) {
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

module.exports = { findJurusan, createJurusan,findJurusanById, updateJurusan };
