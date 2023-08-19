const { Sequelize } = require("sequelize");
const sequelize = require("../../config/db_mysql");

// Definisikan model guru
const Guru = sequelize.define("guru", {
  guru_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  lembaga_pendidikan_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  nip: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  nama_guru: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  jenis_kelamin_id: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  jabatan_guru_id: {
    type: Sequelize.INTEGER,
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
    tableName: "guru",
  });

// Fungsi untuk menampilkan guru by id
async function findGuruById(guru_id) {
    try {
      const guru = await Guru.findOne({
        where: {
          guru_id: guru_id,
        },
      });
      if (guru != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: guru };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: guru,
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
// Fungsi untuk menampilkan guru all
async function findGuru() {
    try {
      const guru = await Guru.findAll();
      if (guru != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: guru };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: guru,
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
async function createGuru(data) {
    try {
      const guru = await Guru.create({
        lembaga_pendidikan_id: data.lembaga_pendidikan_id,
        nip: data.nip,
        email: data.email,
        nama_guru: data.nama_guru,
        jenis_kelamin_id: data.jenis_kelamin_id,
        jabatan_guru_id: data.jabatan_guru_id
      });
  
      return {
        status: "Sukses",
        message: "Data Berhasil Ditambahkan!",
        data: guru,
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
async function updateGuru(GuruId, data) {
    console.log(data)
  try {
    const guru = await Guru.update(
      {
        lembaga_pendidikan_id: data.lembaga_pendidikan_id,
        nip: data.nip,
        email: data.email,
        nama_guru: data.nama_guru,
        jenis_kelamin_id: data.jenis_kelamin_id,
        jabatan_guru_id: data.jabatan_guru_id
      },
      {
        where: { guru_id: GuruId },
      }
    );

    if (guru[0] > 0) {
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

module.exports = { findGuru, createGuru,findGuruById, updateGuru };
