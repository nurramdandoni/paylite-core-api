const { Sequelize } = require("sequelize");
const sequelize = require("../../config/db_mysql");

// Definisikan model programs
const Subscriber = sequelize.define("subscriber", {
subscriber_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  paylite_produk_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  role_produk_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  subscriber_status_id: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  status_pay: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  program_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  end_subscribe: {
    type: Sequelize.DATE,
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
    tableName: "subscriber",
  });

// Fungsi untuk menampilkan paylite subscriber by id
async function findSubscriberById(subscriber_id) {
    try {
      const subscriber = await Subscriber.findOne({
        where: {
            subscriber_id: subscriber_id,
        },
      });
      if (subscriber != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: subscriber };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: subscriber,
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
// Fungsi untuk menampilkan paylite subscriber all
async function findSubscriber() {
    try {
      const subscriber = await Subscriber.findAll();
      if (subscriber != null) {
        return { status: "Sukses", message: "Data Ditemukan!", data: subscriber };
      } else {
        return {
          status: "Error",
          message: "Data Tidak Ditemukan!",
          data: subscriber,
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
async function createSubscriber(data) {
    try {
      const subscriber = await Subscriber.create({
        subscriber_id:data.subscriber_id,
        user_id:data.user_id,
        paylite_produk_id:data.paylite_produk_id,
        role_produk_id:data.role_produk_id,
        subscriber_status_id:data.subscriber_status_id,
        status_pay:data.status_pay,
        program_id:data.program_id,
        end_subscriber:data.end_subscriber
      });
  
      return {
        status: "Sukses",
        message: "Data Berhasil Ditambahkan!",
        data: subscriber,
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
async function updateSubscriber(subscriberId, data) {
  try {
    const subscriber = await Subscriber.update(
      {
        subscriber_id:data.subscriber_id,
        user_id:data.user_id,
        paylite_produk_id:data.paylite_produk_id,
        role_produk_id:data.role_produk_id,
        subscriber_status_id:data.subscriber_status_id,
        status_pay:data.status_pay,
        program_id:data.program_id,
        end_subscriber:data.end_subscriber
      },
      {
        where: { subscriber_id: subscriberId },
      }
    );

    if (subscriber[0] > 0) {
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

// Fungsi untuk menampilkan subscriber by where
async function findSubscriberByWhere(whereData) {
  // console.log(whereData)
  try {
    const dataSubscriber = await Subscriber.findAll({
      where: whereData,
    });
    if (dataSubscriber != null) {
      return { status: "Sukses", message: "Data Ditemukan!", data: dataSubscriber };
    } else {
      return {
        status: "Error",
        message: "Data Tidak Ditemukan!",
        data: dataSubscriber,
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


async function findAdminLembaga(npsn){
  try {
    const query = `
      SELECT *
      FROM subscriber
      JOIN edu_users ON subscriber.subscriber_id = edu_users.subscriber_id
      JOIN lembaga_pendidikan ON edu_users.lembaga_pendidikan_id = lembaga_pendidikan.lembaga_pendidikan_id
      WHERE subscriber.role_produk_id='1' AND lembaga_pendidikan.nomor_legalitas='`+npsn+`'`;

    const dataSubscriber = await sequelize.query(query, {
      // replacements: whereData,
      type: sequelize.QueryTypes.SELECT,
      // model: Subscriber, // Jika ingin menghasilkan instance Sequelize
    });

    if (dataSubscriber.length > 0) {
      return { status: "Sukses", message: "Data Ditemukan!", data: dataSubscriber };
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

module.exports = { findSubscriber, createSubscriber,findSubscriberById, updateSubscriber, findSubscriberByWhere, findAdminLembaga };
