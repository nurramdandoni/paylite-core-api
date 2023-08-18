const express = require("express");
const jwtLib = require("./config/jwt");
const rateLimit = require("express-rate-limit");

const app = express();
const port = 4000;

// Menerapkan pembatasan tingkat permintaan secara umum
const limiter = rateLimit({
  windowMs: 2000, // Periode waktu dalam milidetik (misalnya, 1 detik)
  max: 2, // Jumlah maksimum permintaan dalam periode waktu yang ditentukan
  // message: 'Terlalu Banyak Permintaan Tidak Wajar, Silahkan Coba Kembali!',
  message: {
    status: "Error",
    message: "Terlalu Banyak Permintaan Tidak Wajar, Silahkan Coba Kembali!",
  },
});

// Middleware untuk parsing body permintaan
app.use(express.json());
// Menggunakan middleware pembatasan tingkat permintaan secara umum
app.use(limiter);

// ----------------------------------------------------------------- start Middleware BLock -------------------------------------------------------
// Middleware untuk memeriksa validitas token pada setiap permintaan yang memerlukan otentikasi
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  const responseAutenticate = {
    status: "Error",
    message: "Unauthorized",
  };
  const responseForbiden = {
    status: "Error",
    message: "Invalid Token",
  };
  if (!token) return res.status(401).json(responseAutenticate);

  const validToken = token.split(" ");
  jwtLib.jwt.verify(validToken[1], jwtLib.secretKey, (err, user) => {
    if (err) return res.status(403).json(responseForbiden);

    req.user = user;
    next();
  });
}
// ----------------------------------------------------------------- end Middleware BLock -------------------------------------------------------

// ----------------------------------------------------------------- start Controller BLock -------------------------------------------------------
const produkController = require("./controllers/produk");
const userController = require("./controllers/user");
const profileController = require("./controllers/profile");
const produkPayliteController = require("./controllers/produkPaylite");
const roleProdukController = require("./controllers/roleProduk");
const programController = require("./controllers/program");
const subscriberController = require("./controllers/subscriber");
const eduUserController = require("./controllers/eduUser");
const jenjangPendidikanController = require("./controllers/jenjangPendidikan");
// ----------------------------------------------------------------- end Controller BLock -------------------------------------------------------

// ----------------------------------------------------------------- start API BLock -------------------------------------------------------

app.get("/users", (req, res) => {
  connection.query("SELECT * FROM users", (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});


app.get('/', (req, res) => {
  res.status(200).json({ status: 'Sukses', message:"API Paylite Server Berjalan Baik CI/CD With Jenkins Docker Container!"});
});

// api Global
app.get("/produkPaylite",produkPayliteController.searchProdukPaylite);
app.get("/produkPaylite/:payliteProdukId",produkPayliteController.searchProdukPayliteById);
app.post("/produkPaylite",produkPayliteController.createProdukPaylite);
app.put("/produkPaylite/:payliteProdukId",produkPayliteController.updateProdukPaylite);

app.get("/roleProduk",roleProdukController.searchRoleProduk);
app.get("/roleProduk/:roleProdukId",roleProdukController.findRoleProdukById);
app.post("/roleProduk",roleProdukController.createRoleProduk);
app.put("/roleProduk/:roleProdukId",roleProdukController.updateRoleProduk);

app.get("/program",programController.searchProgram);
app.get("/program/:programId",programController.findProgramById);
app.post("/program",programController.createProgram);
app.put("/program/:programId",programController.updateProgram);

app.get("/subscriber",subscriberController.searchSubscriber);
app.get("/subscriber/:subscriberId",subscriberController.findSubscriberById);
app.post("/subscriber",subscriberController.createSubscriber);
app.put("/subscriber/:subscriberId",subscriberController.updateSubscriber);

app.get("/eduUser",eduUserController.searchEduUser);
app.get("/eduUser/:eduUserId",eduUserController.findProgramById);
app.post("/eduUser",eduUserController.createEduUser);
app.put("/eduUser/:eduUserId",eduUserController.updateEduUser);

app.get("/jenjangPendidikan",jenjangPendidikanController.searchJenjangPendidikan);
app.get("/jenjangPendidikan/:jenjangPendidikanId",jenjangPendidikanController.findJenjangPendidikanById);
app.post("/jenjangPendidikan",jenjangPendidikanController.createJenjangPendidikan);
app.put("/jenjangPendidikan/:jenjangPendidikanId",jenjangPendidikanController.updateJenjangPendidikan);

app.post("/login",userController.searchUser);
app.get(
  "/profile/:profile_id",
  limiter,
  authenticateToken,
  (req, res, next) => {
    const profileId = req.params.profile_id;

    // Cek apakah profileId adalah angka
    if (!/^\d+$/.test(profileId)) {
      return res.status(400).send("Bad Request");
    }

    // Lanjutkan ke controller jika profileId valid
    next();
  },
  profileController.findProfile
);
app.put(
  "/profile/:profile_id",
  limiter,
  authenticateToken,
  (req, res, next) => {
    const profileId = req.params.profile_id;

    // Cek apakah profileId adalah angka
    if (!/^\d+$/.test(profileId)) {
      return res.status(400).send("Bad Request");
    }

    // Lanjutkan ke controller jika profileId valid
    next();
  },
  profileController.updateProfile
);

// api Produk Retail
app.post("/produkRetail", limiter, authenticateToken, produkController.createProduk);
app.post("/bulkProdukRetail", authenticateToken, produkController.createProdukByCsv);
app.get("/produkRetail", limiter, authenticateToken, produkController.searchProduk);
app.get(
  "/produkRetail/:idbarcode",
  limiter,
  authenticateToken,
  produkController.searchProdukByBarcode
);
app.post(
  "/produkRetailNameSearch",
  limiter,
  authenticateToken,
  produkController.searchProdukByName
);
app.put("/produkRetail", authenticateToken, produkController.updateProduk);
app.delete("/produkRetail", authenticateToken, produkController.deleteProduk);

app.post("/usersMongo", async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const dataUser = await createUser(name, email, age);
    if (dataUser) {
      res.json(dataUser);
    } else {
      res.status(422).json({ error: "Invalid Parameter Proses Dibatalkan" });
    }
  } catch (error) {
    res.status(500).json({ error: "Gagal menambahkan pengguna baru" });
  }
});

// ----------------------------------------------------------------- end API Block ---------------------------------------------------

// Menjalankan server
const server = app.listen(port, "0.0.0.0", () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Server berjalan pada host ${host} dan port ${port}`);
});
