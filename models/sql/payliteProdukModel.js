const { Sequelize } = require("sequelize");
const sequelize = require("../../config/db_mysql");

// Definisikan model paylite_produk
const PayliteProduk = sequelize.define("paylite_produk", {
  paylite_produk_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  paylite_produk_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price_month: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  price_day: {
    type: Sequelize.DOUBLE,
    allowNull: false,
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
});

// Fungsi untuk menampilkan paylite produk by id
async function findProdukPayliteById(paylite_produk_id) {
    try {
      const payliteProduk = await PayliteProduk.findOne({
        where: {
          paylite_produk_id: paylite_produk_id,
        },
      });
      //   console.log(profiles);
      if (payliteProduk != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: payliteProduk };
      } else {
        return {
          status: "Error",
          message: "Paylite Produk Tidak Ditemukan!",
          data: profiles,
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
// Fungsi untuk menampilkan paylite produk all
async function findProdukPaylite() {
    try {
      const payliteProduk = await PayliteProduk.findAll();
      if (payliteProduk != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: payliteProduk };
      } else {
        return {
          status: "Error",
          message: "Paylite Produk Tidak Ditemukan!",
          data: profiles,
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
async function createProdukPaylite(data) {
    try {
      const PayliteProduknew = await PayliteProduk.create({
        paylite_produk_id: data.payliteProdukId,
        paylite_produk_name: data.payliteProdukName,
        price_month: data.priceMonth,
        price_day: data.priceDay,
        description: data.description,
      });
  
      return {
        status: "Sukses",
        message: "Data Paylite Produk berhasil disisipkan!",
        data: PayliteProduknew,
      };
    } catch (error) {
      console.error(error);
      return {
        status: "Error",
        message: "Terjadi Kesalahan saat menyisipkan Data Paylite Produk!",
        data: error.message,
      };
    }
  }
// Memperbarui data
async function updateProdukPaylite(payliteProdukId, data) {
    const d = {
        paylite_produk_name: data.payliteProdukName,
        price_month: data.priceMonth,
        price_day: data.priceDay,
        description: data.description,
      }
  try {
    const updatedProdukPaylite = await PayliteProduk.update(
      {
        paylite_produk_name: data.payliteProdukName,
        price_month: data.priceMonth,
        price_day: data.priceDay,
        description: data.description,
      },
      {
        where: { paylite_produk_id: payliteProdukId },
      }
    );

    if (updatedProdukPaylite[0] > 0) {
      return { status: "Sukses", message: "Data Paylite Produk berhasil diperbarui!" };
    } else {
      return { status: "Error", message: "Data Paylite Produk tidak ditemukan!" };
    }
  } catch (error) {
    console.error(error);
    return {
      status: "Error",
      message: "Terjadi Kesalahan saat memperbarui data Paylite Produk!",
      data: error.message,
    };
  }
}

module.exports = { findProdukPaylite, createProdukPaylite,findProdukPayliteById, updateProdukPaylite };
