const express = require('express');
const mysql = require('mysql');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const csv = require('csv-parser');
const fs = require('fs');

const app = express();
const port = 3000;
const secretKey = 'rahasia';

// Middleware untuk parsing body permintaan
app.use(express.json());

// Koneksi ke database MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'PayliteCoreApi'
});


connection.connect((err) => {
  if (err) throw err;
  console.log('Terhubung ke database MySQL');
});

// Koneksi ke database mongoDB
const url = 'mongodb://localhost:27017/payliteCore';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Terhubung ke MongoDB');
  })
  .catch((error) => {
    console.error('Gagal terhubung ke MongoDB:', error);
  });

  // CRUD dengan mongoDB
  // Definisikan skema Mongoose
  const usersSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    age: Number
  });
  const produkSchema = new mongoose.Schema({
    barcode: { type: String, unique: true },
    nama: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  // Buat model Mongoose berdasarkan skema
  const User = mongoose.model('Users', usersSchema);
  const Produk = mongoose.model('Produks', produkSchema);
  // mendefinisikan Index unique model User
  User.createIndexes({ email: 1 }, { unique: true });
  Produk.createIndexes({ barcode: 1 }, { unique: true });

  // Fungsi untuk membuat pengguna baru
  async function createUser(name, email, age) {
    try {
      const newUser = new User({ name, email, age });
      const savedUser = await newUser.save();
      // console.log('Pengguna baru telah ditambahkan:', savedUser);
      return savedUser;
    } catch (error) {
      console.error('Gagal menambahkan pengguna baru:', error);
    }
  }
  async function createProduk(barcode, nama) {
    try {
      const newProduk = new Produk({ barcode, nama });
      const savedProduk = await newProduk.save();
      // console.log('Pengguna baru telah ditambahkan:', savedProduk);
      return savedProduk;
    } catch (error) {
      console.error('Gagal menambahkan Produk baru:', error);
    }
  }

  // Fungsi untuk mendapatkan daftar pengguna
  async function getUsers() {
    try {
      const users = await User.find();
      console.log('Daftar pengguna:', users);
      return users;
    } catch (error) {
      console.error('Gagal mendapatkan daftar pengguna:', error);
    }
  }

  // Fungsi untuk mencari pengguna berdasarkan ID
  async function findUserById(id) {
    try {
      const user = await User.findById(id);
      if (user) {
        console.log('Pengguna ditemukan:', user);
      } else {
        console.log('Pengguna dengan ID tersebut tidak ditemukan');
      }
    } catch (error) {
      console.error('Gagal mencari pengguna:', error);
    }
  }
  // Fungsi untuk mencari produk berdasarkan barcode
  async function findProdukByBarcode(barcode) {
    try {
      const produk = await Produk.find({barcode:barcode});
      if (produk) {
        // console.log('Produk ditemukan:', produk);
        return produk;
      } else {
        console.log('Produk dengan Barcode tersebut tidak ditemukan');
      }
    } catch (error) {
      console.error('Gagal mencari produk:', error);
    }
  }
  // Fungsi untuk mencari produk berdasarkan nama Produk
  async function findProdukByName(nameSearch) {
    try {
      const produk = await Produk.find({ nama: { $regex: nameSearch, $options: "i" } });
      if (produk) {
        // console.log('Produk ditemukan:', produk);
        return produk;
      } else {
        console.log('Produk dengan Barcode tersebut tidak ditemukan');
      }
    } catch (error) {
      console.error('Gagal mencari produk:', error);
    }
  }

  // Fungsi untuk mengupdate pengguna berdasarkan ID
  async function updateUser(id, updates) {
    try {
      const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
      console.log('Pengguna telah diperbarui:', updatedUser);
    } catch (error) {
      console.error('Gagal memperbarui pengguna:', error);
    }
  }

  // Fungsi untuk menghapus pengguna berdasarkan ID
  async function deleteUser(id) {
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      console.log('Pengguna telah dihapus:', deletedUser);
    } catch (error) {
      console.error('Gagal menghapus pengguna:', error);
    }
  }
  // akhir CRUD mongoDB

// Endpoint GET untuk mendapatkan data pengguna
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});
app.get('/usersMongo', async (req, res) => {
  const dataUser = await getUsers();
  res.json(dataUser);
});
app.get('/produk/:idbarcode', async (req, res) => {
  const idbarcode = req.params.idbarcode;
  const dataProduk = await findProdukByBarcode(idbarcode);
  console.log(dataProduk);
  if (dataProduk) {
    res.json(dataProduk);
  } else {
    res.status(404).json({ error: 'Produk tidak ditemukan' });
  }
});
app.post('/produkNameSearch', async (req, res) => {
  const { nameSearch } = req.body;
  const dataProduk = await findProdukByName(nameSearch);
  console.log(dataProduk);
  if (dataProduk) {
    res.json(dataProduk);
  } else {
    res.status(404).json({ error: 'Produk tidak ditemukan' });
  }
});
app.post('/usersMongo', async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const dataUser = await createUser(name, email, age);
    if(dataUser){
      res.json(dataUser);
    }else{
      res.status(422).json({ error: 'Invalid Parameter Proses Dibatalkan' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Gagal menambahkan pengguna baru' });
  }
});
app.post('/bulkInsertProduk', async (req, res) => {
  const { csvPath } = req.body;
  
  try {
    // Read the CSV file
    const results = [];
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        // Process each row and create users
        for (const row of results) {
          const { key, value } = row;
          console.log(key,row);
          await createProduk(key, value);
        }

        res.json({ message: 'Data inserted from CSV successfully.' });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Gagal memasukkan data dari CSV' });
  }
});
app.get('/', (req, res) => {
    res.send('Server berjalan dengan baik!');
  });

// Endpoint untuk login dan menghasilkan token JWT
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Proses otentikasi pengguna
  // ...

  // Jika otentikasi berhasil, membuat token JWT
  const token = jwt.sign({ username }, secretKey,{ expiresIn: '1m' });
  res.json({ token });
});

// Middleware untuk memeriksa validitas token pada setiap permintaan yang memerlukan otentikasi
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  
  if (!token) return res.sendStatus(401);
  
  const validToken = token.split(" ");
  jwt.verify(validToken[1], secretKey, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
}

// Contoh penggunaan middleware authenticateToken pada endpoint yang memerlukan otentikasi
app.get('/protected', authenticateToken, (req, res) => {
  // Hanya pengguna yang telah diotentikasi yang bisa mengakses endpoint ini
  // ...
  res.send('Welcome!');
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan pada port ${port}`);
});
