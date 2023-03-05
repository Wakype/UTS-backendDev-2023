const express = require('express');
const { jwtValidateMiddleware } = require('../middleware/jwtValidateMiddleware');
const { registerAuth, loginAuth, authMe } = require('../controllers/authController');
const { getBarang, createBarang } = require('../controllers/barangController');
const { getPetugas } = require('../controllers/userController');

const routers = express.Router();

// ========================== AUTH ========================= //
// === Users === //
routers.post('/register', registerAuth);
routers.post('/login', loginAuth);

routers.use(jwtValidateMiddleware);

// ========================== GET ========================= //
// === Auth === //
routers.get('/authme', authMe)

// === Barang === //
routers.get('/barang/list-barang', getBarang)
routers.post('/barang/create-barang', createBarang)

// === User === //
routers.get('/petugas/list-petugas', getPetugas)


module.exports = routers;
