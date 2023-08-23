const { Sequelize } = require("sequelize");
const sequelize = require("../../config/db_mysql");

// Definisikan model jadwal pelajaran
const JadwalPelajaran = sequelize.define("jadwal_pelajaran", {
    jadwal_pelajaran_id: {
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
  hari_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  kurikulum_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  guru_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  data_kelas_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  jam_mulai: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  jam_selesai: {
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
    tableName: "jadwal_pelajaran",
  });

// Fungsi untuk menampilkan jadwal pelajaran by id
async function findJadwalPelajaranById(jadwal_pelajaran_id) {
    try {
      const dataJadwalPelajaran = await JadwalPelajaran.findOne({
        where: {
          jadwal_pelajaran_id: jadwal_pelajaran_id,
        },
      });
      if (dataJadwalPelajaran != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: dataJadwalPelajaran };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: dataJadwalPelajaran,
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
// Fungsi untuk menampilkan Jadwal Pelajaran all
async function findJadwalPelajaran() {
    try {
      const dataJadwalPelajaran = await JadwalPelajaran.findAll();
      if (dataJadwalPelajaran != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: dataJadwalPelajaran };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: dataJadwalPelajaran,
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
async function createJadwalPelajaran(data) {
    try {
      const dataJadwalPelajaran = await JadwalPelajaran.create({
        lembaga_pendidikan_id: data.lembaga_pendidikan_id,
        tahun_ajaran_id: data.tahun_ajaran_id,
        hari_id: data.hari_id,
        kurikulum_id: data.kurikulum_id,
        guru_id: data.guru_id,
        data_kelas_id: data.data_kelas_id,
        jam_mulai: data.jam_mulai,
        jam_selesai: data.jam_selesai
      });
  
      return {
        status: "Sukses",
        message: "Data Berhasil Ditambahkan!",
        data: dataJadwalPelajaran,
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
async function updateJadwalPelajaran(JadwalPelajaranId, data) {
    console.log(data)
  try {
    const dataJadwalPelajaran = await JadwalPelajaran.update(
      {
        lembaga_pendidikan_id: data.lembaga_pendidikan_id,
        tahun_ajaran_id: data.tahun_ajaran_id,
        hari_id: data.hari_id,
        kurikulum_id: data.kurikulum_id,
        guru_id: data.guru_id,
        data_kelas_id: data.data_kelas_id,
        jam_mulai: data.jam_mulai,
        jam_selesai: data.jam_selesai
      },
      {
        where: { jadwal_pelajaran_id: JadwalPelajaranId },
      }
    );

    if (dataJadwalPelajaran[0] > 0) {
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

// Fungsi untuk menampilkan jadwal pelajaran by where
async function findJadwalPelajaranByWhere(whereData) {
    // console.log(whereData)
    try {
      const dataJadwalPelajaran = await JadwalPelajaran.findAll({
        where: whereData,
      });
      if (dataJadwalPelajaran != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: dataJadwalPelajaran };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: dataJadwalPelajaran,
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

  async function findJadwalPelajaranJoin(idLembaga){
    try {
      const query = `
      SELECT * FROM jadwal_pelajaran join tahun_ajaran on jadwal_pelajaran.tahun_ajaran_id=tahun_ajaran.tahun_ajaran_id JOIN hari on jadwal_pelajaran.hari_id=hari.hari_id JOIN kurikulum on jadwal_pelajaran.kurikulum_id=kurikulum.kurikulum_id JOIN guru on jadwal_pelajaran.guru_id=guru.guru_id JOIN data_kelas on jadwal_pelajaran.data_kelas_id=data_kelas.data_kelas_id JOIN mata_ajar on kurikulum.mata_ajar_id=mata_ajar.mata_ajar_id JOIN kelas ON data_kelas.kelas_id=kelas.kelas_id WHERE jadwal_pelajaran.lembaga_pendidikan_id='`+idLembaga+`' ORDER by jadwal_pelajaran.hari_id,jadwal_pelajaran.jam_mulai ASC`;
  
      const dataJadwalPelajaranJoin = await sequelize.query(query, {
        // replacements: whereData,
        type: sequelize.QueryTypes.SELECT,
        // model: Subscriber, // Jika ingin menghasilkan instance Sequelize
      });
  
      if (dataJadwalPelajaranJoin.length > 0) {
        return { status: "Sukses", message: "Data Ditemukan!", data: dataJadwalPelajaranJoin };
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
  async function findJadwalPelajaranJoinByKrsNisn(idLembaga,hari,nisn,waktu){
    try {
      const query = `
      SELECT * FROM krs JOIN jadwal_pelajaran ON krs.kurikulum_id=jadwal_pelajaran.kurikulum_id left JOIN kelas on jadwal_pelajaran.data_kelas_id=kelas.kelas_id WHERE jadwal_pelajaran.hari_id ='`+hari+`' AND krs.siswa_id=(SELECT siswa_id FROM siswa WHERE siswa.nisn='`+nisn+`') and krs.kelas_id=kelas.kelas_id AND TIME('`+waktu+`') >= jadwal_pelajaran.jam_mulai AND TIME('`+waktu+`') <= jadwal_pelajaran.jam_selesai and jadwal_pelajaran.lembaga_pendidikan_id='`+idLembaga+`' and krs.tahun_ajaran_id=jadwal_pelajaran.tahun_ajaran_id and jadwal_pelajaran.tahun_ajaran_id=(SELECT tahun_ajaran_id FROM tahun_ajaran WHERE tahun_ajaran.status='aktif' AND tahun_ajaran.lembaga_pendidikan_id ='`+idLembaga+`')`;
  
      const dataJadwalPelajaranJoinByKrsNisn = await sequelize.query(query, {
        // replacements: whereData,
        type: sequelize.QueryTypes.SELECT,
        // model: Subscriber, // Jika ingin menghasilkan instance Sequelize
      });
  
      if (dataJadwalPelajaranJoinByKrsNisn.length > 0) {
        return { status: "Sukses", message: "Data Ditemukan!", data: dataJadwalPelajaranJoinByKrsNisn };
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

module.exports = { findJadwalPelajaran, createJadwalPelajaran,findJadwalPelajaranById, updateJadwalPelajaran, findJadwalPelajaranByWhere, findJadwalPelajaranJoin, findJadwalPelajaranJoinByKrsNisn };
