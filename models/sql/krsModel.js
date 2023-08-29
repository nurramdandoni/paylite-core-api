const { Sequelize } = require("sequelize");
const sequelize = require("../../config/db_mysql");

// Definisikan model krs
const Krs = sequelize.define("krs", {
  krs_id: {
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
  kurikulum_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  status_wali: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  status_pay: {
    type: Sequelize.STRING,
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
    tableName: "krs",
  });

  // Definisikan model siswa
const Siswa = sequelize.define("siswa", {
  siswa_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  lembaga_pendidikan_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  nisn: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email_orang_tua: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  nama_siswa: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  jenis_kelamin_id: {
    type: Sequelize.STRING,
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
    tableName: "siswa",
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

      // Definisikan asosiasi antara Kurikulum dan Kelas
Krs.belongsTo(Siswa, { foreignKey: "siswa_id", as: "siswa" });
Krs.belongsTo(TahunAjaran, { foreignKey: "tahun_ajaran_id", as: "tahun_ajaran" });
Krs.belongsTo(Kelas, { foreignKey: "kelas_id", as: "kelas" });
Krs.belongsTo(Kurikulum, { foreignKey: "kurikulum_id", as: "kurikulum" });

// Fungsi untuk menampilkan krs by id
async function findKrsById(krs_id) {
    try {
      const dataKrs = await Krs.findOne({
        where: {
          krs_id: krs_id,
        },
        include: [
          {
            model: Siswa,
            as: 'siswa', // Alias untuk asosiasi dengan model Kelas
          },
          {
            model: TahunAjaran,
            as: 'tahun_ajaran', // Alias untuk asosiasi dengan model Kelas
          },
          {
            model: Kelas,
            as: 'kelas', // Alias untuk asosiasi dengan model Kelas
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
          
        ],
      });
      if (dataKrs != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: dataKrs };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: dataKrs,
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
// Fungsi untuk menampilkan krs all
async function findKrs() {
    try {
      const dataKrs = await Krs.findAll({
        include: [
          {
            model: Siswa,
            as: 'siswa', // Alias untuk asosiasi dengan model Kelas
          },
          {
            model: TahunAjaran,
            as: 'tahun_ajaran', // Alias untuk asosiasi dengan model Kelas
          },
          {
            model: Kelas,
            as: 'kelas', // Alias untuk asosiasi dengan model Kelas
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
        ],
      });
      if (dataKrs != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: dataKrs };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: dataKrs,
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
async function createKrs(data) {
    try {
      const dataKrs = await Krs.create({
        lembaga_pendidikan_id: data.lembaga_pendidikan_id,
        tahun_ajaran_id: data.tahun_ajaran_id,
        kelas_id: data.kelas_id,
        siswa_id: data.siswa_id,
        kurikulum_id: data.kurikulum_id,
        status_wali: data.status_wali,
        status_pay: data.status_pay,
        description: data.description
      });
  
      return {
        status: "Sukses",
        message: "Data Berhasil Ditambahkan!",
        data: dataKrs,
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
async function updateKrs(KrsId, data) {
    console.log(data)
  try {
    const dataKrs = await Krs.update(
      {
        lembaga_pendidikan_id: data.lembaga_pendidikan_id,
        tahun_ajaran_id: data.tahun_ajaran_id,
        kelas_id: data.kelas_id,
        siswa_id: data.siswa_id,
        kurikulum_id: data.kurikulum_id,
        status_wali: data.status_wali,
        status_pay: data.status_pay,
        description: data.description
      },
      {
        where: { krs_id: KrsId },
      }
    );

    if (dataKrs[0] > 0) {
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

// Fungsi untuk menampilkan krs by where
async function findKrsByWhere(whereData) {
    // console.log(whereData)
    try {
      const dataKrs = await Krs.findAll({
        where: whereData,
        include: [
          {
            model: Siswa,
            as: 'siswa', // Alias untuk asosiasi dengan model Kelas
          },
          {
            model: TahunAjaran,
            as: 'tahun_ajaran', // Alias untuk asosiasi dengan model Kelas
          },
          {
            model: Kelas,
            as: 'kelas', // Alias untuk asosiasi dengan model Kelas
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
        ],
      });
      if (dataKrs != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: dataKrs };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: dataKrs,
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
// Fungsi untuk menampilkan krs by where
async function findKrsByWhereGroup(whereData,groupColumn) {
    // console.log(whereData)
    try {
      const dataKrs = await Krs.findAll({
        attributes: [
          [sequelize.fn('COUNT', sequelize.col(groupColumn)), 'count'],
          groupColumn,
        ],
        group: [groupColumn],
        where: whereData,
        include: [
          {
            model: Siswa,
            as: 'siswa', // Alias untuk asosiasi dengan model Kelas
          },
          {
            model: TahunAjaran,
            as: 'tahun_ajaran', // Alias untuk asosiasi dengan model Kelas
          },
          {
            model: Kelas,
            as: 'kelas', // Alias untuk asosiasi dengan model Kelas
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
        ],
      });
      if (dataKrs != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: dataKrs };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: dataKrs,
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

  async function findDataKrsJoin(idLembaga){
    try {
      const query = `
      SELECT *,a.tahun_ajaran_id as dTh,a.kelas_id as dKk FROM krs a JOIN tahun_ajaran b on a.tahun_ajaran_id=b.tahun_ajaran_id JOIN kelas c on a.kelas_id=c.kelas_id JOIN siswa d on a.siswa_id=d.siswa_id JOIN kurikulum e on a.kurikulum_id=e.kurikulum_id WHERE a.lembaga_pendidikan_id=`+idLembaga+` GROUP by a.tahun_ajaran_id,a.kelas_id ORDER by a.tahun_ajaran_id,c.nama_kelas`;
  
      const dataKrsJoin = await sequelize.query(query, {
        // replacements: whereData,
        type: sequelize.QueryTypes.SELECT,
        // model: Subscriber, // Jika ingin menghasilkan instance Sequelize
      });
  
      if (dataKrsJoin.length > 0) {
        return { status: "Sukses", message: "Data Ditemukan!", data: dataKrsJoin };
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

module.exports = { findKrs, createKrs,findKrsById, updateKrs, findKrsByWhere, findDataKrsJoin, findKrsByWhereGroup };
