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

      // Definisikan asosiasi antara Kurikulum dan Kelas
DataKelas.belongsTo(Siswa, { foreignKey: "siswa_id", as: "siswa" });
DataKelas.belongsTo(TahunAjaran, { foreignKey: "tahun_ajaran_id", as: "tahun_ajaran" });
DataKelas.belongsTo(Kelas, { foreignKey: "kelas_id", as: "kelas" });
DataKelas.belongsTo(Guru, { foreignKey: "wali_kelas_id", as: "guru" });

// Fungsi untuk menampilkan data kelas by id
async function findDataKelasById(data_kelas_id) {
    try {
      const dataKelas = await DataKelas.findOne({
        where: {
          data_kelas_id: data_kelas_id,
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
            model: Guru,
            as: 'guru', // Alias untuk asosiasi dengan model Kelas
          },
        ],
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
      const dataKelas = await DataKelas.findAll({
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
            model: Guru,
            as: 'guru', // Alias untuk asosiasi dengan model Kelas
          },
        ],
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
// Menyisipkan data baru
async function createDataKelas(data) {
    try {
      const dataKelas = await DataKelas.create({
        lembaga_pendidikan_id: data.lembaga_pendidikan_id,
        tahun_ajaran_id: data.tahun_ajaran_id,
        kelas_id: data.kelas_id,
        siswa_id: data.siswa_id,
        wali_kelas_id: data.wali_kelas_id,
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
        wali_kelas_id: data.wali_kelas_id,
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

// Fungsi untuk menghapus data Kelas berdasarkan data_kelas_id
async function deleteDataKelasById(dataKelasId) {
  try {
    const result = await DataKelas.destroy({
      where: { data_kelas_id: dataKelasId },
    });

    if (result) {
      return { status: "Sukses", message: "Data Berhasil Dihapus!" };
    } else {
      return { status: "Error", message: "Data Tidak Berhasil!" };
    }
  } catch (error) {
    console.error(error);
    return {
      status: "Error",
      message: "Terjadi Kesalahan Saat Menghapus Data!",
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
          model: Guru,
          as: 'guru', // Alias untuk asosiasi dengan model Kelas
        },
      ],
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
      SELECT *,data_kelas.tahun_ajaran_id as dkT,data_kelas.kelas_id as dkK
      FROM data_kelas
      JOIN tahun_ajaran ON data_kelas.tahun_ajaran_id = tahun_ajaran.tahun_ajaran_id
      JOIN kelas ON data_kelas.kelas_id = kelas.kelas_id
      JOIN siswa ON data_kelas.siswa_id = siswa.siswa_id
      WHERE data_kelas.lembaga_pendidikan_id='`+idLembaga+`' AND tahun_ajaran.status='aktif' group by data_kelas.tahun_ajaran_id,data_kelas.kelas_id order by data_kelas.tahun_ajaran_id,kelas.nama_kelas`;

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

module.exports = { findDataKelas, createDataKelas,findDataKelasById, updateDataKelas,deleteDataKelasById, findDataKelasByWhere, findDataKelasJoin };
