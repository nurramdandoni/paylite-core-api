const { Sequelize } = require("sequelize");
const sequelize = require("../../config/db_mysql");

// Definisikan model prodi
const Prodi = sequelize.define("prodi", {
  prodi_id: {
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
  nama_prodi: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  kepala_prodi: {
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
    tableName: "prodi",
  });

// Fungsi untuk menampilkan prodi by id
async function findProdiById(prodi_id) {
    try {
      const prodi = await Prodi.findOne({
        where: {
          prodi_id: prodi_id,
        },
      });
      if (prodi != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: prodi };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: prodi,
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
// Fungsi untuk menampilkan prodi all
async function findProdi() {
    try {
      const prodi = await Prodi.findAll();
      if (prodi != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: prodi };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: prodi,
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
async function createProdi(data) {
    try {
      const prodi = await Prodi.create({
        lembaga_pendidikan_id: data.lembaga_pendidikan_id,
        nomor_legalitas: data.nomor_legalitas,
        sk_akreditasi: data.sk_akreditasi,
        nama_prodi: data.nama_prodi,
        kepala_prodi: data.kepala_prodi,
        description: data.description,
        status: data.status
      });
  
      return {
        status: "Sukses",
        message: "Data Produk Berhasil Ditambahkan!",
        data: prodi,
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
async function updateProdi(ProdiId, data) {
    console.log(data)
  try {
    const prodi = await Prodi.update(
      {
        lembaga_pendidikan_id: data.lembaga_pendidikan_id,
        nomor_legalitas: data.nomor_legalitas,
        sk_akreditasi: data.sk_akreditasi,
        nama_prodi: data.nama_prodi,
        kepala_prodi: data.kepala_prodi,
        description: data.description,
        status: data.status
      },
      {
        where: { prodi_id: ProdiId },
      }
    );

    if (prodi[0] > 0) {
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

module.exports = { findProdi, createProdi,findProdiById, updateProdi };
