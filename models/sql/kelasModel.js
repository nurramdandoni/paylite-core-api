const { Sequelize } = require("sequelize");
const sequelize = require("../../config/db_mysql");

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

    // Definisikan asosiasi antara Kurikulum dan Kelas
Kelas.belongsTo(TahunAjaran, { foreignKey: "tahun_ajaran_id", as: "tahun_ajaran" });


// Fungsi untuk menampilkan kelas by id
async function findKelasById(kelas_id) {
  const orderBy = [
    // ['tahun_ajaran','nama_tahun_ajaran', 'ASC'],
    ['nama_kelas', 'ASC']
  ];
    try {
      const kelas = await Kelas.findOne({
        where: {
          kelas_id: kelas_id,
        },
        order:orderBy,
        include: [
          {
            model: TahunAjaran,
            as: 'tahun_ajaran', // Alias untuk asosiasi dengan model Kelas
          },
        ],
      });
      if (kelas != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: kelas };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: kelas,
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
// Fungsi untuk menampilkan kelas all
async function findKelas() {
  const orderBy = [
    // ['tahun_ajaran','nama_tahun_ajaran', 'ASC'],
    ['nama_kelas', 'ASC']
  ];
    try {
      const kelas = await Kelas.findAll({
        order:orderBy,
        include: [
          {
            model: TahunAjaran,
            as: 'tahun_ajaran', // Alias untuk asosiasi dengan model Kelas
          },
        ],
      });
      if (kelas != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: kelas };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: kelas,
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
async function createKelas(data) {
    try {
      const kelas = await Kelas.create({
        lembaga_pendidikan_id: data.lembaga_pendidikan_id,
        tahun_ajaran_id: data.tahun_ajaran_id,
        nama_kelas: data.nama_kelas,
        description: data.description,
        status: data.status
      });
  
      return {
        status: "Sukses",
        message: "Data Berhasil Ditambahkan!",
        data: kelas,
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
async function updateKelas(KelasId, data) {
    console.log(data)
  try {
    const kelas = await Kelas.update(
      {
        lembaga_pendidikan_id: data.lembaga_pendidikan_id,
        tahun_ajaran_id: data.tahun_ajaran_id,
        nama_kelas: data.nama_kelas,
        description: data.description,
        status: data.status
      },
      {
        where: { kelas_id: KelasId },
      }
    );

    if (kelas[0] > 0) {
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

// Fungsi untuk menampilkan kelas by where
async function findKelasByWhere(whereData) {
  // console.log(whereData)
  const orderBy = [
    // ['tahun_ajaran','nama_tahun_ajaran', 'ASC'],
    ['nama_kelas', 'ASC']
  ];
  try {
    const dataKelas = await Kelas.findAll({
      where: whereData,
      order: orderBy,
      include: [
        {
          model: TahunAjaran,
          as: 'tahun_ajaran', // Alias untuk asosiasi dengan model Kelas
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

module.exports = { findKelas, createKelas,findKelasById, updateKelas, findKelasByWhere };
