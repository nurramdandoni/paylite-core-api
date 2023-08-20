const { Sequelize } = require("sequelize");
const sequelize = require("../../config/db_mysql");

// Definisikan model profile
const Profile = sequelize.define("profiles", {
  profile_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  full_name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  location: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  kyc_type: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  kyc_number: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  kyc_image: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  wa_number: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  picture: {
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
});

// Fungsi untuk menampilkan profile
async function findProfile(profile_id) {
  // console.log("sampe ini ",profile_id);
  try {
    const profiles = await Profile.findOne({
      where: {
        profile_id: profile_id,
      },
    });
    //   console.log(profiles);
    if (profiles != null) {
      return { status: "Sukses", message: "Data Ditemukan!", data: profiles };
    } else {
      return {
        status: "Error",
        message: "Data Tidak Ditemukan!",
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
  async function insertProfile(data) {
    try {
      const newProfile = await Profile.create({
        full_name:data.fullName,
        location:data.location,
        gender:data.gender,
        kyc_type:data.kycType,
        kyc_number:data.kycNumber,
        kyc_image:data.kycImage,
        wa_number:data.waNumber,
        picture:data.picture
      });

      return {
        status: "Sukses",
        message: "Data Berhasil Ditambahkan!",
        data: newProfile,
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
  async function updateProfile(profile_id, data) {
    try {
      const updatedProfile = await Profile.update(
        {
          full_name:data.fullName,
          gender:data.gender,
          location:data.location,
          kyc_type:data.kycType,
          kyc_number:data.kycNumber,
          kyc_image:data.kycImage,
          wa_number:data.waNumber,
          picture:data.picture
        },
        {
          where: { profile_id: profile_id },
        }
      );

      if (updatedProfile[0] > 0) {
        return { status: "Sukses", message: "Data Berhasil Diperbaharui!" };
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

// Fungsi untuk menampilkan prodi by where
async function findProfileByWhere(whereData) {
  // console.log(whereData)
  try {
    const dataProfile = await Profile.findAll({
      where: whereData,
    });
    if (dataProfile != null) {
      return { status: "Sukses", message: "Data Ditemukan!", data: dataProfile };
    } else {
      return {
        status: "Error",
        message: "Data Tidak Ditemukan!",
        data: dataProfile,
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

module.exports = { findProfile, insertProfile, updateProfile, findProfileByWhere };
