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
  const responseAutenticate = {
    status:"Error",
    message:"Unauthorized"
  }
  const responseForbiden = {
    status:"Error",
    message:"Invalid Token"
  }
  if (!token) return res.status(401).json(responseAutenticate);
  
  const validToken = token.split(" ");
  jwt.verify(validToken[1], secretKey, (err, user) => {
    if (err) return res.status(403).json(responseForbiden);

    req.user = user;
    next();
  });
}
// ----------------------------------------------------------------- end Middleware BLock -------------------------------------------------------


// ----------------------------------------------------------------- start Controller BLock -------------------------------------------------------
const produkController = require('./controllers/produk');
// ----------------------------------------------------------------- end Controller BLock -------------------------------------------------------



// ----------------------------------------------------------------- start API BLock -------------------------------------------------------


app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

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
// api produk master saat scan
app.post('/produk',limiter,authenticateToken, produkController.createProduk);
app.post('/bulkProduk', authenticateToken, produkController.createProdukByCsv);
app.get('/produk',limiter, authenticateToken, produkController.searchProduk);
app.get('/produk/:idbarcode',limiter, authenticateToken, produkController.searchProdukByBarcode);
app.post('/produkNameSearch',limiter, authenticateToken, produkController.searchProdukByName);
app.put('/produk', authenticateToken, produkController.updateProduk);
app.delete('/produk', authenticateToken, produkController.deleteProduk);

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

// ----------------------------------------------------------------- end API Block ---------------------------------------------------

// Menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan pada port ${port}`);
});
