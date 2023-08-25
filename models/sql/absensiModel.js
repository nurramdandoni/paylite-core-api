const { Sequelize } = require("sequelize");
const sequelize = require("../../config/db_mysql");

// Definisikan model absensi
const Absensi = sequelize.define("absensi", {
    absensi_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  lembaga_pendidikan_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  jadwal_pelajaran_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  tanggal_absensi: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  pertemuan: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  siswa_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  status_kehadiran: {
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
    tableName: "absensi",
  });

// Fungsi untuk menampilkan absensi by id
async function findAbsensiById(absensi_id) {
    try {
      const dataAbsensi = await Absensi.findOne({
        where: {
          absensi_id: absensi_id,
        },
      });
      if (dataAbsensi != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: dataAbsensi };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: dataAbsensi,
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
// Fungsi untuk menampilkan Absensi all
async function findAbsensi() {
    try {
      const dataAbsensi = await Absensi.findAll();
      if (dataAbsensi != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: dataAbsensi };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: dataAbsensi,
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
async function createAbsensi(data) {
    try {
      const dataAbsensi = await Absensi.create({
        lembaga_pendidikan_id: data.lembaga_pendidikan_id,
        jadwal_pelajaran_id: data.jadwal_pelajaran_id,
        tanggal_absensi: data.tanggal_absensi,
        pertemuan: data.pertemuan,
        siswa_id: data.siswa_id,
        status_kehadiran: data.status_kehadiran
      });
  
      return {
        status: "Sukses",
        message: "Data Berhasil Ditambahkan!",
        data: dataAbsensi,
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
async function updateAbsensi(AbsensiId, data) {
    console.log(data)
  try {
    const dataAbsensi = await Absensi.update(
      {
        lembaga_pendidikan_id: data.lembaga_pendidikan_id,
        jadwal_pelajaran_id: data.jadwal_pelajaran_id,
        tanggal_absensi: data.tanggal_absensi,
        pertemuan: data.pertemuan,
        siswa_id: data.siswa_id,
        status_kehadiran: data.status_kehadiran,
      },
      {
        where: { absensi_id: AbsensiId },
      }
    );

    if (dataAbsensi[0] > 0) {
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

// Fungsi untuk menampilkan absensi by where
async function findAbsensiByWhere(whereData) {
    // console.log(whereData)
    try {
      const dataAbsensi = await Absensi.findAll({
        where: whereData,
      });
      if (dataAbsensi != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: dataAbsensi };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: dataAbsensi,
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

  async function findAbsensiByWhereTanggal(where){
    const lembaga_pendidikan_id = where.lembaga_pendidikan_id;
    const jadwal_pelajaran_id = where.jadwal_pelajaran_id;
    const siswa_id = where.siswa_id;
    const tanggal_absensi_start = where.tanggal_absensi_start;
    const tanggal_absensi_end = where.tanggal_absensi_end;
    try {
      const query = `
      SELECT * FROM absensi WHERE absensi.lembaga_pendidikan_id='`+lembaga_pendidikan_id+`' AND absensi.jadwal_pelajaran_id='`+jadwal_pelajaran_id+`' AND absensi.siswa_id = '`+siswa_id+`' AND DATE(absensi.tanggal_absensi) BETWEEN '`+tanggal_absensi_start+`' AND '`+tanggal_absensi_end+`'; `;
  
      const dataAbsensiUserTanggal = await sequelize.query(query, {
        // replacements: whereData,
        type: sequelize.QueryTypes.SELECT,
        // model: Subscriber, // Jika ingin menghasilkan instance Sequelize
      });
  
      if (dataAbsensiUserTanggal != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: dataAbsensiUserTanggal };
      } else {
        return { status: "Error", message: "Data Tidak Ditemukan!", data: dataAbsensiUserTanggal };
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

module.exports = { findAbsensi, createAbsensi,findAbsensiById, updateAbsensi, findAbsensiByWhere, findAbsensiByWhereTanggal };
