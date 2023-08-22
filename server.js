const express = require("express");
const jwtLib = require("./config/jwt");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

const app = express();
const port = 4000;

// Menggunakan middleware CORS untuk mengizinkan semua origin
app.use(cors());

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
// app.use(limiter);

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
const lembagaPendidikanController = require("./controllers/lembagaPendidikan");
const prodiController = require("./controllers/prodi");
const jurusanController = require("./controllers/jurusan");
const mataAjarController = require("./controllers/mataAjar");
const tahunAjaranController = require("./controllers/tahunAjaran");
const kurikulumController = require("./controllers/kurikulum");
const siswaController = require("./controllers/siswa");
const jabatanGuruController = require("./controllers/jabatanGuru");
const guruController = require("./controllers/guru");
const kelasController = require("./controllers/kelas");
const dataKelasController = require("./controllers/dataKelas");
const krsController = require("./controllers/krs");
const hariController = require("./controllers/hari");
const jadwalPelajaranController = require("./controllers/jadwalPelajaran");
const absensiController = require("./controllers/absensi");
const nilaiController = require("./controllers/nilai");
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
app.post("/produkPayliteWhere",produkPayliteController.findProdukPayliteByWhere);

app.get("/roleProduk",roleProdukController.searchRoleProduk);
app.get("/roleProduk/:roleProdukId",roleProdukController.findRoleProdukById);
app.post("/roleProduk",roleProdukController.createRoleProduk);
app.put("/roleProduk/:roleProdukId",roleProdukController.updateRoleProduk);
app.post("/roleProdukWhere",roleProdukController.findRoleProdukByWhere);

app.get("/program",programController.searchProgram);
app.get("/program/:programId",programController.findProgramById);
app.post("/program",programController.createProgram);
app.put("/program/:programId",programController.updateProgram);
app.post("/programWhere",programController.findProgramByWhere);

app.get("/subscriber",subscriberController.searchSubscriber);
app.get("/subscriber/:subscriberId",subscriberController.findSubscriberById);
app.post("/subscriber",subscriberController.createSubscriber);
app.put("/subscriber/:subscriberId",subscriberController.updateSubscriber);
app.post("/subscriberWhere",subscriberController.findSubscriberByWhere);

app.get("/eduUser",eduUserController.searchEduUser);
app.get("/eduUser/:eduUserId",eduUserController.findProgramById);
app.post("/eduUser",eduUserController.createEduUser);
app.put("/eduUser/:eduUserId",eduUserController.updateEduUser);
app.post("/eduUserWhere",eduUserController.findEduUserByWhere);

app.get("/jenjangPendidikan",jenjangPendidikanController.searchJenjangPendidikan);
app.get("/jenjangPendidikan/:jenjangPendidikanId",jenjangPendidikanController.findJenjangPendidikanById);
app.post("/jenjangPendidikan",jenjangPendidikanController.createJenjangPendidikan);
app.put("/jenjangPendidikan/:jenjangPendidikanId",jenjangPendidikanController.updateJenjangPendidikan);
app.post("/jenjangPendidikanWhere",jenjangPendidikanController.findJenjangPendidikanByWhere);

app.get("/lembagaPendidikan",lembagaPendidikanController.searchLembagaPendidikan);
app.get("/lembagaPendidikan/:lembagaPendidikanId",lembagaPendidikanController.findLembagaPendidikanById);
app.post("/lembagaPendidikan",lembagaPendidikanController.createLembagaPendidikan);
app.put("/lembagaPendidikan/:lembagaPendidikanId",lembagaPendidikanController.updateLembagaPendidikan);
app.post("/lembagaPendidikanWhere",lembagaPendidikanController.findLembagaPendidikanByWhere);

app.get("/prodi",prodiController.searchProdi);
app.get("/prodi/:prodiId",prodiController.findProdiById);
app.post("/prodi",prodiController.createProdi);
app.put("/prodi/:prodiId",prodiController.updateProdi);
app.post("/prodiWhere",prodiController.findProdiByWhere);

app.get("/jurusan",jurusanController.searchJurusan);
app.get("/jurusan/:jurusanId",jurusanController.findJurusanById);
app.post("/jurusan",jurusanController.createJurusan);
app.put("/jurusan/:jurusanId",jurusanController.updateJurusan);
app.post("/jurusanWhere",jurusanController.findJurusanByWhere);

app.get("/mataAjar",mataAjarController.searchMataAjar);
app.get("/mataAjar/:mataAjarId",mataAjarController.findMataAjarById);
app.post("/mataAjar",mataAjarController.createMataAjar);
app.put("/mataAjar/:mataAjarId",mataAjarController.updateMataAjar);
app.post("/mataAjarWhere",mataAjarController.findMataAjarByWhere);

app.get("/tahunAjaran",tahunAjaranController.searchTahunAjaran);
app.get("/tahunAjaran/:tahunAjaranId",tahunAjaranController.findTahunAjaranById);
app.post("/tahunAjaran",tahunAjaranController.createTahunAjaran);
app.put("/tahunAjaran/:tahunAjaranId",tahunAjaranController.updateTahunAjaran);
app.post("/tahunAjaranWhere",tahunAjaranController.findTahunAjaranByWhere);

app.get("/kurikulum",kurikulumController.searchKurikulum);
app.get("/kurikulum/:kurikulumId",kurikulumController.findKurikulumById);
app.post("/kurikulum",kurikulumController.createKurikulum);
app.put("/kurikulum/:kurikulumId",kurikulumController.updateKurikulum);
app.post("/kurikulumWhere",kurikulumController.findKurikulumByWhere);

app.get("/siswa",siswaController.searchSiswa);
app.get("/siswa/:siswaId",siswaController.findSiswaById);
app.post("/siswa",siswaController.createSiswa);
app.put("/siswa/:siswaId",siswaController.updateSiswa);
app.post("/siswaWhere",siswaController.findSiswaByWhere);

app.get("/jabatanGuru",jabatanGuruController.searchJabatanGuru);
app.get("/jabatanGuru/:jabatanGuruId",jabatanGuruController.findJabatanGuruById);
app.post("/jabatanGuru",jabatanGuruController.createJabatanGuru);
app.put("/jabatanGuru/:jabatanGuruId",jabatanGuruController.updateJabatanGuru);
app.post("/jabatanGuruWhere",jabatanGuruController.findJabatanGuruByWhere);

app.get("/guru",guruController.searchGuru);
app.get("/guru/:guruId",guruController.findGuruById);
app.post("/guru",guruController.createGuru);
app.put("/guru/:guruId",guruController.updateGuru);
app.post("/guruWhere",guruController.findGuruByWhere);

app.get("/kelas",kelasController.searchKelas);
app.get("/kelas/:kelasId",kelasController.findKelasById);
app.post("/kelas",kelasController.createKelas);
app.put("/kelas/:kelasId",kelasController.updateKelas);
app.post("/kelasWhere",kelasController.findKelasByWhere);

app.get("/dataKelas",dataKelasController.searchDataKelas);
app.get("/dataKelas/:dataKelasId",dataKelasController.findDataKelasById);
app.post("/dataKelas",dataKelasController.createDataKelas);
app.put("/dataKelas/:dataKelasId",dataKelasController.updateDataKelas);
app.post("/dataKelasWhere",dataKelasController.findDataKelasByWhere);

app.get("/krs",krsController.searchKrs);
app.get("/krs/:krsId",krsController.findKrsById);
app.post("/krs",krsController.createKrs);
app.put("/krs/:krsId",krsController.updateKrs);
app.post("/krsWhere",krsController.findKrsByWhere);

app.get("/hari",hariController.searchHari);
app.get("/hari/:hariId",hariController.findHariById);
app.post("/hari",hariController.createHari);
app.put("/hari/:hariId",hariController.updateHari);

app.get("/jadwalPelajaran",jadwalPelajaranController.searchJadwalPelajaran);
app.get("/jadwalPelajaran/:jadwalPelajaranId",jadwalPelajaranController.findJadwalPelajaranById);
app.post("/jadwalPelajaran",jadwalPelajaranController.createJadwalPelajaran);
app.put("/jadwalPelajaran/:jadwalPelajaranId",jadwalPelajaranController.updateJadwalPelajaran);
app.post("/jadwalPelajaranWhere",jadwalPelajaranController.findJadwalPelajaranByWhere);

app.get("/absensi",absensiController.searchAbsensi);
app.get("/absensi/:absensiId",absensiController.findAbsensiById);
app.post("/absensi",absensiController.createAbsensi);
app.put("/absensi/:absensiId",absensiController.updateAbsensi);
app.post("/absensiWhere",absensiController.findAbsensiByWhere);

app.get("/nilai",nilaiController.searchNilai);
app.get("/nilai/:nilaiId",nilaiController.findNilaiById);
app.post("/nilai",nilaiController.createNilai);
app.put("/nilai/:nilaiId",nilaiController.updateNilai);
app.post("/nilaiWhere",nilaiController.findNilaiByWhere);

app.get("/cekAdminLembaga/:npsn",subscriberController.findAdminLembaga)

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
