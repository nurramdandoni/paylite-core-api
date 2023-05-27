const express = require('express');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');


const app = express();
const port = 3000;
const secretKey = 'rahasia';

// Menerapkan pembatasan tingkat permintaan secara umum
const limiter = rateLimit({
  windowMs: 1000, // Periode waktu dalam milidetik (misalnya, 1 detik)
  max: 2, // Jumlah maksimum permintaan dalam periode waktu yang ditentukan
  message: 'Terlalu Banyak Permintaan Tidak Wajar, Silahkan Coba Kembali!',
});

// Middleware untuk parsing body permintaan
app.use(express.json());
// Menggunakan middleware pembatasan tingkat permintaan secara umum
app.use(limiter);

// ----------------------------------------------------------------- start Middleware BLock -------------------------------------------------------
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
// ----------------------------------------------------------------- end Middleware BLock -------------------------------------------------------

const produkController = require('./controllers/produk');
// ----------------------------------------------------------------- start SQL BLock -------------------------------------------------------
// Endpoint GET untuk mendapatkan data pengguna
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});
// ----------------------------------------------------------------- end SQL Block --------------------------------------------------------


// ----------------------------------------------------------------- start No SQL Block ---------------------------------------------------

  app.get('/usersMongo', async (req, res) => {
  const dataUser = await getUsers();
  res.json(dataUser);
});

// api produk master saat scan
app.post('/produk',miniter, produkController.createProduk);
app.post('/bulkProduk', produkController.createProdukByCsv);
app.get('/produk',limiter, produkController.searchProduk);
app.get('/produk/:idbarcode',limiter, produkController.searchProdukByBarcode);
app.post('/produkNameSearch',limiter, produkController.searchProdukByName);
app.put('/produk', produkController.updateProduk);
app.delete('/produk', produkController.deleteProduk);

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

// ----------------------------------------------------------------- end No SQL Block ---------------------------------------------------


app.get('/', (req, res) => {
    res.send('Server berjalan dengan baik!');
  });

// Endpoint untuk login dan menghasilkan token JWT
app.post('/login',limiter, (req, res) => {
  const { username, password } = req.body;

  // Proses otentikasi pengguna
  // ...

  // Jika otentikasi berhasil, membuat token JWT
  const token = jwt.sign({ username }, secretKey,{ expiresIn: '1d' });
  res.json({ token });
});


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
