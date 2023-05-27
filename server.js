const express = require('express');
const jwt = require('jsonwebtoken');


const app = express();
const port = 3000;
const secretKey = 'rahasia';

// Middleware untuk parsing body permintaan
app.use(express.json());

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
app.post('/produk', produkController.createProduk);
app.post('/bulkProduk', produkController.createProdukByCsv);
app.get('/produk', produkController.searchProduk);
app.get('/produk/:idbarcode', produkController.searchProdukByBarcode);
app.post('/produkNameSearch', produkController.searchProdukByName);
app.put('/produk', produkController.updateProduk);

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
app.post('/login', (req, res) => {
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
