const express = require('express');
const {
  jwtValidateMiddleware,
} = require('../middleware/jwtValidateMiddleware');
const {
  registerAuth,
  loginAuth,
  authMe,
} = require('../controllers/authController');
const {
  getBarang,
  createBarang,
  deleteBarang,
  updateBarang,
  getBarangById,
} = require('../controllers/barangController');
const {
  getPetugas,
  getDetailPetugasById,
  updatePetugas,
} = require('../controllers/userController');
const { getLelang } = require('../controllers/lelangController');

const routers = express.Router();

// ========================== AUTH ========================= //
// === Users === //
routers.post('/register', registerAuth);
routers.post('/login', loginAuth);

routers.use(jwtValidateMiddleware);

// ========================== GET ========================= //
// === Auth === //
routers.get('/authme', authMe);

// === Barang === //
routers.get('/barang/list-barang', getBarang);
routers.get('/barang/detail-barang/:id', getBarangById);

// === User === //
routers.get('/petugas/list-petugas', getPetugas);
routers.get('/petugas/list-petugas/:id', getDetailPetugasById);

// === Lelang === //
routers.get('/lelang/list-lelang', getLelang);


// ========================== POST ========================= //
// === Barang === //
routers.post('/barang/create-barang', createBarang);

// ========================== PUT ========================= //
// === Barang === //
routers.put('/barang/update-barang', updateBarang);

// === User === //
routers.put('/petugas/update-petugas', updatePetugas);

// ========================== DELETE ========================= //
// === Barang === //
routers.delete('/barang/delete-barang/:id', deleteBarang);


module.exports = routers;
