const { Sequelize } = require("sequelize");
const sequelize = require("../../config/db_mysql");

// Definisikan model programs
const Program = sequelize.define("program", {
program_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  nama_program: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price_or_percent_diskon: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  nilai_diskon: {
    type: Sequelize.DOUBLE,
    allowNull: true,
  },
  start_date: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  end_date: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  description: {
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
    tableName: "program",
  });

// Fungsi untuk menampilkan paylite program by id
async function findProgramById(program_id) {
    try {
      const program = await Program.findOne({
        where: {
          program_id: program_id,
        },
      });
      if (program != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: program };
      } else {
        return {
          status: "Error",
          message: "Role Tidak Ditemukan!",
          data: program,
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
// Fungsi untuk menampilkan paylite program all
async function findProgram() {
    try {
      const program = await Program.findAll();
      if (program != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: program };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: program,
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
async function createProgram(data) {
    try {
      const program = await Program.create({
        nama_program:data.nama_program,
        price_or_percent_diskon:data.price_or_percent_diskon,
        nilai_diskon:data.nilai_diskon,
        price_or_percent_diskon:data.price_or_percent_diskon,
        start_date:data.start_date,
        end_date:data.end_date,
        status:data.status,
        description:data.description
      });
  
      return {
        status: "Sukses",
        message: "Data Produk Berhasil Ditambahkan!",
        data: program,
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
async function updateProgram(ProgramId, data) {
    console.log(data)
  try {
    const updatedProgram = await Program.update(
      {
        nama_program:data.nama_program,
        price_or_percent_diskon:data.price_or_percent_diskon,
        nilai_diskon:data.nilai_diskon,
        start_date:data.start_date,
        end_date:data.end_date,
        status:data.status,
        description:data.description
      },
      {
        where: { program_id: ProgramId },
      }
    );

    if (updatedProgram[0] > 0) {
      return { status: "Sukses", message: "Data Produk Berhasil Diperbaharui!" };
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

module.exports = { findProgram, createProgram,findProgramById, updateProgram };
