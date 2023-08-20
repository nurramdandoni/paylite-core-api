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
          message: "Data Tidak Ditemukan!",
          data: payliteProduk,
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
          message: "Data Tidak Ditemukan!",
          data: payliteProduk,
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
        paylite_produk_id: data.paylite_produk_id,
        paylite_produk_name: data.paylite_produk_name,
        price_month: data.price_month,
        price_day: data.price_day,
        description: data.description,
      });
  
      return {
        status: "Sukses",
        message: "Data Berhasil Ditambahkan!",
        data: PayliteProduknew,
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
async function updateProdukPaylite(payliteProdukId, data) {
  try {
    const updatedProdukPaylite = await PayliteProduk.update(
      {
        paylite_produk_name: data.paylite_produk_name,
        price_month: data.price_month,
        price_day: data.price_day,
        description: data.description,
      },
      {
        where: { paylite_produk_id: payliteProdukId },
      }
    );

    if (updatedProdukPaylite[0] > 0) {
      return { status: "Sukses", message: "Data Berhasil Diperbarui!" };
    } else {
      return { status: "Error", message: "Data Tidak Ditemukan!" };
    }
  } catch (error) {
    console.error(error);
    return {
      status: "Error",
      message: "Terjadi Kesalahan Saat Memperbaharui Data!",
      data: error.message,
    };
  }
}

// Fungsi untuk menampilkan Produk paylite by where
async function findProdukPayliteByWhere(whereData) {
  // console.log(whereData)
  try {
    const dataProdukPaylite = await PayliteProduk.findAll({
      where: whereData,
    });
    if (dataProdukPaylite != null) {
      return { status: "Sukses", message: "Data Ditemukan!", data: dataProdukPaylite };
    } else {
      return {
        status: "Error",
        message: "Data Tidak Ditemukan!",
        data: dataProdukPaylite,
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

module.exports = { findProdukPaylite, createProdukPaylite,findProdukPayliteById, updateProdukPaylite, findProdukPayliteByWhere };
