const { Sequelize } = require("sequelize");
const sequelize = require("../../config/db_mysql");

// Definisikan model kurikulum
const Kurikulum = sequelize.define("kurikulum", {
  kurikulum_id: {
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
  prodi_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  jurusan_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  mata_ajar_id: {
    type: Sequelize.INTEGER,
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
    tableName: "kurikulum",
  });

// Fungsi untuk menampilkan kurikulum by id
async function findKurikulumById(kurikulum_id) {
    try {
      const kurikulum = await Kurikulum.findOne({
        where: {
          kurikulum_id: kurikulum_id,
        },
      });
      if (kurikulum != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: kurikulum };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: kurikulum,
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
// Fungsi untuk menampilkan kurikulum all
async function findKurikulum() {
    try {
      const kurikulum = await Kurikulum.findAll();
      if (kurikulum != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: kurikulum };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: kurikulum,
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
async function createKurikulum(data) {
    try {
      const kurikulum = await Kurikulum.create({
        lembaga_pendidikan_id: data.lembaga_pendidikan_id,
        tahun_ajaran_id: data.tahun_ajaran_id,
        prodi_id: data.prodi_id,
        jurusan_id: data.jurusan_id,
        mata_ajar_id: data.mata_ajar_id,
        description: data.description,
        status: data.status
      });
  
      return {
        status: "Sukses",
        message: "Data Berhasil Ditambahkan!",
        data: kurikulum,
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
async function updateKurikulum(KurikulumId, data) {
    console.log(data)
  try {
    const kurikulum = await Kurikulum.update(
      {
        lembaga_pendidikan_id: data.lembaga_pendidikan_id,
        tahun_ajaran_id: data.tahun_ajaran_id,
        prodi_id: data.prodi_id,
        jurusan_id: data.jurusan_id,
        mata_ajar_id: data.mata_ajar_id,
        description: data.description,
        status: data.status
      },
      {
        where: { kurikulum_id: KurikulumId },
      }
    );

    if (kurikulum[0] > 0) {
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

module.exports = { findKurikulum, createKurikulum,findKurikulumById, updateKurikulum };
