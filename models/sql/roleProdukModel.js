const { Sequelize } = require("sequelize");
const sequelize = require("../../config/db_mysql");

// Definisikan model paylite_produk
const RoleProduk = sequelize.define("role_produk", {
role_produk_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  paylite_produk_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  role_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  show_public: {
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
});

// Fungsi untuk menampilkan paylite role produk by id
async function findRoleProdukById(role_produk_id) {
    try {
      const roleProduk = await RoleProduk.findOne({
        where: {
          role_produk_id: role_produk_id,
        },
      });
      if (roleProduk != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: roleProduk };
      } else {
        return {
          status: "Error",
          message: "Role Tidak Ditemukan!",
          data: roleProduk,
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
// Fungsi untuk menampilkan paylite role produk all
async function findRoleProduk() {
    try {
      const roleProduks = await RoleProduk.findAll();
      if (roleProduks != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: roleProduks };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: roleProduks,
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
async function createRoleProduk(data) {
    try {
      const roleProduk = await RoleProduk.create({
        paylite_produk_id: data.paylite_produk_id,
        role_name: data.role_name,
        show_public: data.show_public
      });
  
      return {
        status: "Sukses",
        message: "Data Produk Berhasil Ditambahkan!",
        data: roleProduk,
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
async function updateRoleProduk(RoleProdukId, data) {
  try {
    const updatedRoleproduks = await RoleProduk.update(
      {
        paylite_produk_id: data.paylite_produk_id,
        role_name: data.role_name,
        show_public: data.show_public
      },
      {
        where: { role_produk_id: RoleProdukId },
      }
    );

    if (updatedRoleproduks[0] > 0) {
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

module.exports = { findRoleProduk, createRoleProduk,findRoleProdukById, updateRoleProduk };
