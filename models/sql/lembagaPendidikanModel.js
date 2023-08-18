const { Sequelize } = require("sequelize");
const sequelize = require("../../config/db_mysql");

// Definisikan model lemabaga pendidikan
const LembagaPendidikan = sequelize.define("lembaga_pendidikan", {
  lembaga_pendidikan_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  nomor_legalitas: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  jenjang_pendidikan_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  sk_akreditasi: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  nama_lembaga: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nama_kepala_sekolah: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  provinsi_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  kabupaten_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  kecamatan_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  desa_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  latitude: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  longitude: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  website: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email_sekolah: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  logo_sekolah: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  nomor_telepon: {
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
    tableName: "lembaga_pendidikan",
  });

// Fungsi untuk menampilkan lembaga pendidikan by id
async function findLembagaPendidikanById(lembaga_pendidikan_id) {
    try {
      const lembaga_pendidikan = await LembagaPendidikan.findOne({
        where: {
          lembaga_pendidikan_id: lembaga_pendidikan_id,
        },
      });
      if (lembaga_pendidikan != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: lembaga_pendidikan };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: lembaga_pendidikan,
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
// Fungsi untuk menampilkan lembaga pendidikan all
async function findLembagaPendidikan() {
    try {
      const lembaga_pendidikan = await LembagaPendidikan.findAll();
      if (lembaga_pendidikan != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: lembaga_pendidikan };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: lembaga_pendidikan,
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
async function createLembagaPendidikan(data) {
    try {
      const lembaga_pendidikan = await LembagaPendidikan.create({
            nomor_legalitas: data.nomor_legalitas,
            jenjang_pendidikan_id: data.jenjang_pendidikan_id,
            sk_akreditasi: data.sk_akreditasi,
            nama_lembaga: data.nama_lembaga,
            nama_kepala_sekolah: data.nama_kepala_sekolah,
            provinsi_id: data.provinsi_id,
            kabupaten_id: data.kabupaten_id,
            kecamatan_id: data.kecamatan_id,
            desa_id: data.desa_id,
            latitude: data.latitude,
            longitude: data.longitude,
            website: data.website,
            email_sekolah: data.email_sekolah,
            logo_sekolah: data.logo_sekolah,
            nomor_telepon: data.nomor_telepon
      });
  
      return {
        status: "Sukses",
        message: "Data Produk Berhasil Ditambahkan!",
        data: lembaga_pendidikan,
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
async function updateLembagaPendidikan(LembagaPendidikanId, data) {
    console.log(data)
  try {
    const lembaga_pendidikan = await LembagaPendidikan.update(
      {
            nomor_legalitas: data.nomor_legalitas,
            jenjang_pendidikan_id: data.jenjang_pendidikan_id,
            sk_akreditasi: data.sk_akreditasi,
            nama_lembaga: data.nama_lembaga,
            nama_kepala_sekolah: data.nama_kepala_sekolah,
            provinsi_id: data.provinsi_id,
            kabupaten_id: data.kabupaten_id,
            kecamatan_id: data.kecamatan_id,
            desa_id: data.desa_id,
            latitude: data.latitude,
            longitude: data.longitude,
            website: data.website,
            email_sekolah: data.email_sekolah,
            logo_sekolah: data.logo_sekolah,
            nomor_telepon: data.nomor_telepon
      },
      {
        where: { lembaga_pendidikan_id: LembagaPendidikanId },
      }
    );

    if (lembaga_pendidikan[0] > 0) {
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

module.exports = { findLembagaPendidikan, createLembagaPendidikan,findLembagaPendidikanById, updateLembagaPendidikan };
