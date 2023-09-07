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

    // Definisikan model mata ajar
const MataAjar = sequelize.define("mata_ajar", {
  mata_ajar_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  lembaga_pendidikan_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  nama_mata_ajar: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  bobot_sks: {
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
    tableName: "mata_ajar",
  });

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
    allowNull: false,
  },
  jabatan_guru_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
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
    tableName: "guru",
  });

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
  wali_kelas_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
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

    // Definisikan model kelas
const Kelas = sequelize.define("kelas", {
  kelas_id: {
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
  nama_kelas: {
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
    tableName: "kelas",
  });
        // Definisikan asosiasi antara Kurikulum dan Kelas
JadwalPelajaran.belongsTo(TahunAjaran, { foreignKey: "tahun_ajaran_id", as: "tahun_ajaran" });
JadwalPelajaran.belongsTo(Kurikulum, { foreignKey: "kurikulum_id", as: "kurikulum" });
Kurikulum.belongsTo(MataAjar, { foreignKey: "mata_ajar_id", as: "mata_ajar" });
JadwalPelajaran.belongsTo(Guru, { foreignKey: "guru_id", as: "guru" });
JadwalPelajaran.belongsTo(DataKelas, { foreignKey: "data_kelas_id", as: "data_kelas" });
DataKelas.belongsTo(Kelas, { foreignKey: "kelas_id", as: "kelas" });
// Fungsi untuk menampilkan jadwal pelajaran by id
async function findJadwalPelajaranById(jadwal_pelajaran_id) {
    try {
      const dataJadwalPelajaran = await JadwalPelajaran.findOne({
        where: {
          jadwal_pelajaran_id: jadwal_pelajaran_id,
        },
        include: [
          {
            model: TahunAjaran,
            as: 'tahun_ajaran', // Alias untuk asosiasi dengan model Kelas
          },
          {
            model: Kurikulum,
            as: 'kurikulum', // Alias untuk asosiasi dengan model Kelas
            include: [
              {
                model: MataAjar,
                as: 'mata_ajar', // Menggunakan alias yang telah didefinisikan
              },
            ],
          },
          {
            model: Guru,
            as: 'guru', // Alias untuk asosiasi dengan model Kelas
          },  
          {
            model: DataKelas,
            as: 'data_kelas', // Alias untuk asosiasi dengan model Kelas
            include: [
              {
                model: Kelas,
                as: 'kelas', // Menggunakan alias yang telah didefinisikan
              },
            ],
          },        
        ],
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
      const dataJadwalPelajaran = await JadwalPelajaran.findAll({
        include: [
          {
            model: TahunAjaran,
            as: 'tahun_ajaran', // Alias untuk asosiasi dengan model Kelas
          },
          {
            model: Kurikulum,
            as: 'kurikulum', // Alias untuk asosiasi dengan model Kelas
            include: [
              {
                model: MataAjar,
                as: 'mata_ajar', // Menggunakan alias yang telah didefinisikan
              },
            ],
          },
          {
            model: Guru,
            as: 'guru', // Alias untuk asosiasi dengan model Kelas
          },  
          {
            model: DataKelas,
            as: 'data_kelas', // Alias untuk asosiasi dengan model Kelas
            include: [
              {
                model: Kelas,
                as: 'kelas', // Menggunakan alias yang telah didefinisikan
              },
            ],
          },        
        ],
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
        include: [
          {
            model: TahunAjaran,
            as: 'tahun_ajaran', // Alias untuk asosiasi dengan model Kelas
          },
          {
            model: Kurikulum,
            as: 'kurikulum', // Alias untuk asosiasi dengan model Kelas
            include: [
              {
                model: MataAjar,
                as: 'mata_ajar', // Menggunakan alias yang telah didefinisikan
              },
            ],
          },
          {
            model: Guru,
            as: 'guru', // Alias untuk asosiasi dengan model Kelas
          },  
          {
            model: DataKelas,
            as: 'data_kelas', // Alias untuk asosiasi dengan model Kelas
            include: [
              {
                model: Kelas,
                as: 'kelas', // Menggunakan alias yang telah didefinisikan
              },
            ],
          },        
        ],
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
// Fungsi untuk menampilkan jadwal pelajaran by where Report
async function findJadwalPelajaranByGroupReport(whereData) {
    // console.log(whereData)
    try {
      const dataJadwalPelajaran = await JadwalPelajaran.findAll({
        attributes: [
          [sequelize.fn('COUNT', sequelize.col('jadwal_pelajaran.kurikulum_id','jadwal_pelajaran.guru_id','jadwal_pelajaran.*')), 'count'],
          'kurikulum_id',
          'guru_id',
        ],
        group: ['kurikulum_id','guru_id',],
        where: whereData,
        include: [
          {
            model: TahunAjaran,
            as: 'tahun_ajaran', // Alias untuk asosiasi dengan model Kelas
          },
          {
            model: Kurikulum,
            as: 'kurikulum', // Alias untuk asosiasi dengan model Kelas
            include: [
              {
                model: MataAjar,
                as: 'mata_ajar', // Menggunakan alias yang telah didefinisikan
              },
            ],
          },
          {
            model: Guru,
            as: 'guru', // Alias untuk asosiasi dengan model Kelas
          },  
          {
            model: DataKelas,
            as: 'data_kelas', // Alias untuk asosiasi dengan model Kelas
            include: [
              {
                model: Kelas,
                as: 'kelas', // Menggunakan alias yang telah didefinisikan
              },
            ],
          },        
        ],
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
      SELECT * FROM jadwal_pelajaran join tahun_ajaran on jadwal_pelajaran.tahun_ajaran_id=tahun_ajaran.tahun_ajaran_id JOIN hari on jadwal_pelajaran.hari_id=hari.hari_id JOIN kurikulum on jadwal_pelajaran.kurikulum_id=kurikulum.kurikulum_id JOIN guru on jadwal_pelajaran.guru_id=guru.guru_id JOIN mata_ajar on kurikulum.mata_ajar_id=mata_ajar.mata_ajar_id JOIN kelas ON jadwal_pelajaran.data_kelas_id=kelas.kelas_id WHERE jadwal_pelajaran.lembaga_pendidikan_id='`+idLembaga+`' AND tahun_ajaran.status='aktif' ORDER by jadwal_pelajaran.hari_id,jadwal_pelajaran.jam_mulai,kelas.nama_kelas ASC`;
  
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
      // const query = `
      // SELECT * FROM krs JOIN jadwal_pelajaran ON krs.kurikulum_id=jadwal_pelajaran.kurikulum_id left JOIN kelas on jadwal_pelajaran.data_kelas_id=kelas.kelas_id WHERE jadwal_pelajaran.hari_id ='`+hari+`' AND krs.siswa_id=(SELECT siswa_id FROM siswa WHERE siswa.nisn='`+nisn+`') and krs.kelas_id=kelas.kelas_id AND TIME('`+waktu+`') >= jadwal_pelajaran.jam_mulai AND TIME('`+waktu+`') <= jadwal_pelajaran.jam_selesai and jadwal_pelajaran.lembaga_pendidikan_id='`+idLembaga+`' and krs.tahun_ajaran_id=jadwal_pelajaran.tahun_ajaran_id and jadwal_pelajaran.tahun_ajaran_id=(SELECT tahun_ajaran_id FROM tahun_ajaran WHERE tahun_ajaran.status='aktif' AND tahun_ajaran.lembaga_pendidikan_id ='`+idLembaga+`')`;
      const query = `
      SELECT * FROM jadwal_pelajaran a JOIN krs b on a.kurikulum_id=b.kurikulum_id JOIN siswa c on b.siswa_id=c.siswa_id WHERE a.lembaga_pendidikan_id='`+idLembaga+`' and a.tahun_ajaran_id=(SELECT aa.tahun_ajaran_id from tahun_ajaran aa WHERE aa.status='aktif' and aa.lembaga_pendidikan_id='`+idLembaga+`') and a.hari_id='`+hari+`' and TIME('`+waktu+`') >= a.jam_mulai AND TIME('`+waktu+`') <= a.jam_selesai AND a.data_kelas_id=b.kelas_id and c.nisn='`+nisn+`'; `;
  
      const dataJadwalPelajaranJoinByKrsNisn = await sequelize.query(query, {
        // replacements: whereData,
        type: sequelize.QueryTypes.SELECT,
        // model: Subscriber, // Jika ingin menghasilkan instance Sequelize
      });
  
      if (dataJadwalPelajaranJoinByKrsNisn != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: dataJadwalPelajaranJoinByKrsNisn };
      } else {
        return { status: "Error", message: "Data Tidak Ditemukan!", data: dataJadwalPelajaranJoinByKrsNisn };
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
  async function findJadwalPelajaranBentrok(idLembaga,hari,id_guru,waktu_mulai,waktu_selesai){
    try {
      const query = `
      SELECT * FROM jadwal_pelajaran a WHERE a.lembaga_pendidikan_id=`+idLembaga+` AND a.guru_id = `+id_guru+` AND a.hari_id = `+hari+` AND (a.jam_mulai >= "`+waktu_mulai+`" AND a.jam_mulai <= "`+waktu_mulai+`") OR (a.jam_selesai >= "`+waktu_selesai+`" AND a.jam_selesai <= "`+waktu_selesai+`"); `;
  
      const dataJadwalPelajaranBentrok = await sequelize.query(query, {
        // replacements: whereData,
        type: sequelize.QueryTypes.SELECT,
        // model: Subscriber, // Jika ingin menghasilkan instance Sequelize
      });
  
      if (dataJadwalPelajaranBentrok != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: dataJadwalPelajaranBentrok };
      } else {
        return { status: "Error", message: "Data Tidak Ditemukan!", data: dataJadwalPelajaranBentrok };
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

module.exports = { findJadwalPelajaran, createJadwalPelajaran,findJadwalPelajaranById, updateJadwalPelajaran, findJadwalPelajaranByWhere, findJadwalPelajaranJoin, findJadwalPelajaranJoinByKrsNisn, findJadwalPelajaranBentrok, findJadwalPelajaranByGroupReport };
