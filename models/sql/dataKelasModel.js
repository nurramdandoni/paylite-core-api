const { Sequelize } = require("sequelize");
const sequelize = require("../../config/db_mysql");

// Definisikan model data kelas
const DataKelas = sequelize.define("data_kelas", {
  data_kelas_id: {
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
    tableName: "data_kelas",
  });

// Fungsi untuk menampilkan data kelas by id
async function findDataKelasById(data_kelas_id) {
    try {
      const dataKelas = await DataKelas.findOne({
        where: {
          data_kelas_id: data_kelas_id,
        },
      });
      if (dataKelas != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: dataKelas };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: dataKelas,
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
// Fungsi untuk menampilkan data kelas all
async function findDataKelas() {
    try {
      const dataKelas = await DataKelas.findAll();
      if (dataKelas != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: dataKelas };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: dataKelas,
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
async function createDataKelas(data) {
    try {
      const dataKelas = await DataKelas.create({
        lembaga_pendidikan_id: data.lembaga_pendidikan_id,
        tahun_ajaran_id: data.tahun_ajaran_id,
        kelas_id: data.kelas_id,
        siswa_id: data.siswa_id,
        description: data.description
      });
  
      return {
        status: "Sukses",
        message: "Data Berhasil Ditambahkan!",
        data: dataKelas,
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
async function updateDataKelas(DataKelasId, data) {
    console.log(data)
  try {
    const dataKelas = await DataKelas.update(
      {
        lembaga_pendidikan_id: data.lembaga_pendidikan_id,
        tahun_ajaran_id: data.tahun_ajaran_id,
        kelas_id: data.kelas_id,
        siswa_id: data.siswa_id,
        description: data.description
      },
      {
        where: { data_kelas_id: DataKelasId },
      }
    );

    if (dataKelas[0] > 0) {
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

// Fungsi untuk menampilkan data kelas by where
async function findDataKelasByWhere(whereData) {
  // console.log(whereData)
  try {
    const dataKelas = await DataKelas.findAll({
      where: whereData,
    });
    if (dataKelas != null) {
      return { status: "Sukses", message: "Data Ditemukan!", data: dataKelas };
    } else {
      return {
        status: "Error",
        message: "Data Tidak Ditemukan!",
        data: dataKelas,
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

async function findDataKelasJoin(idLembaga){
  try {
    const query = `
      SELECT *
      FROM data_kelas
      JOIN tahun_ajaran ON data_kelas.tahun_ajaran_id = tahun_ajaran.tahun_ajaran_id
      JOIN kelas ON data_kelas.kelas_id = kelas.kelas_id
      JOIN siswa ON data_kelas.siswa_id = siswa.siswa_id
      WHERE data_kelas.lembaga_pendidikan_id='`+idLembaga+`'`;

    const dataKelasJoin = await sequelize.query(query, {
      // replacements: whereData,
      type: sequelize.QueryTypes.SELECT,
      // model: Subscriber, // Jika ingin menghasilkan instance Sequelize
    });

    if (dataKelasJoin.length > 0) {
      return { status: "Sukses", message: "Data Ditemukan!", data: dataKelasJoin };
    } else {
      return { status: "Error", message: "Data Tidak Ditemukan!", data: [] };
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

module.exports = { findDataKelas, createDataKelas,findDataKelasById, updateDataKelas, findDataKelasByWhere, findDataKelasJoin };
