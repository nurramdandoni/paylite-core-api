const { Sequelize } = require("sequelize");
const sequelize = require("../../config/db_mysql");

// Definisikan model tahun ajaran
const TahunAjaran = sequelize.define("tahun_ajaran", {
  tahun_ajaran_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  lembaga_pendidikan_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  nama_tahun_ajaran: {
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
    tableName: "tahun_ajaran",
  });

// Fungsi untuk menampilkan jurutahun ajaran by id
async function findTahunAjaranById(tahun_ajaran_id) {
    try {
      const tahunAjaran = await TahunAjaran.findOne({
        where: {
          tahun_ajaran_id: tahun_ajaran_id,
        },
      });
      if (tahunAjaran != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: tahunAjaran };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: tahunAjaran,
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
// Fungsi untuk menampilkan tahun ajaran all
async function findTahunAjaran() {
    try {
      const tahunAjaran = await TahunAjaran.findAll();
      if (tahunAjaran != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: tahunAjaran };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: tahunAjaran,
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
async function createTahunAjaran(data) {
    try {
      const tahunAjaran = await TahunAjaran.create({
        lembaga_pendidikan_id: data.lembaga_pendidikan_id,
        nama_tahun_ajaran: data.nama_tahun_ajaran,
        description: data.description,
        status: data.status
      });
  
      return {
        status: "Sukses",
        message: "Data Produk Berhasil Ditambahkan!",
        data: tahunAjaran,
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
async function updateTahunAjaran(TahunAjaranId, data) {
    console.log(data)
  try {
    const tahunAjaran = await TahunAjaran.update(
      {
        lembaga_pendidikan_id: data.lembaga_pendidikan_id,
        nama_tahun_ajaran: data.nama_tahun_ajaran,
        description: data.description,
        status: data.status
      },
      {
        where: { tahun_ajaran_id: TahunAjaranId },
      }
    );

    if (tahunAjaran[0] > 0) {
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

// Fungsi untuk menampilkan tahun ajaran by where
async function findTahunAjaranByWhere(whereData) {
  // console.log(whereData)
  try {
    const dataTahunAjaran = await TahunAjaran.findAll({
      where: whereData,
    });
    if (dataTahunAjaran != null) {
      return { status: "Sukses", message: "Data Ditemukan!", data: dataTahunAjaran };
    } else {
      return {
        status: "Error",
        message: "Data Tidak Ditemukan!",
        data: dataTahunAjaran,
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

module.exports = { findTahunAjaran, createTahunAjaran,findTahunAjaranById, updateTahunAjaran, findTahunAjaranByWhere };
