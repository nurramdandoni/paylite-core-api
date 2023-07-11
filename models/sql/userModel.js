const { Sequelize } = require("sequelize");
const sequelize = require("../../config/db_mysql");

// Definisikan model User
const User = sequelize.define("users", {
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  profile_id: {
    type: Sequelize.INTEGER,
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

// Fungsi untuk menampilkan User
async function loginProses(username, password) {
  try {
    const users = await User.findOne({
      where: {
        username: username,
        password: password,
      },
    });
    if (users != null) {
      return { status: "Sukses", message: "Login Berhasil!", data: users };
    } else {
      return {
        status: "Error",
        message: "Pengguna Tidak Ditemukan!",
        data: users,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      status: "Error",
      message: "Terjadi Kesalahan Saat Login!",
      data: error.message,
    };
  }
}
// Fungsi untuk menampilkan User
async function loginOauth2(email) {
  try {
    const users = await User.findOne({
      where: {
        username: email,
      },
    });
    if (users != null) {
      return { status: "Sukses", message: "Login Berhasil!", data: users };
    } else {
      return {
        status: "Error",
        message: "Pengguna Tidak Ditemukan!",
        data: users,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      status: "Error",
      message: "Terjadi Kesalahan Saat Login!",
      data: error.message,
    };
  }
}

// Menyisipkan data baru
async function insertUser(data) {
  try {
    const newUser = await User.create({
      username: data.username,
      password: data.password,
      role: data.role,
      profile_id: data.profile_id,
    });

    return {
      status: "Sukses",
      message: "Data user berhasil disisipkan!",
      data: newUser,
    };
  } catch (error) {
    console.error(error);
    return {
      status: "Error",
      message: "Terjadi Kesalahan saat menyisipkan data user!",
      data: error.message,
    };
  }
}

// Memperbarui data
async function updateUser(userId, data) {
  try {
    const updatedUser = await User.update(
      {
        username: data.username,
        password: data.password,
        role: data.role,
      },
      {
        where: { user_id: userId },
      }
    );

    if (updatedUser[0] > 0) {
      return { status: "Sukses", message: "Data user berhasil diperbarui!" };
    } else {
      return { status: "Error", message: "Data user tidak ditemukan!" };
    }
  } catch (error) {
    console.error(error);
    return {
      status: "Error",
      message: "Terjadi Kesalahan saat memperbarui data user!",
      data: error.message,
    };
  }
}

module.exports = { loginProses, loginOauth2, insertUser, updateUser };
