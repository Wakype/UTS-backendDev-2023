const express = require('express');
const path = require('path');
const fs = require('fs');
const { jwtValidateMiddleware } = require('../middleware/jwtValidateMiddleware');
const { registerAuth, loginAuth } = require('../controllers/authController');
const { getBarang } = require('../controllers/barangController');

const routers = express.Router();

// ========================== AUTH ========================= //
// === Users === //
routers.post('/register', registerAuth);
routers.post('/login', loginAuth);

// routers.use(jwtValidateMiddleware);

// ========================== GET ========================= //
// === Barang === //
routers.get('/list-barang', getBarang)
module.exports = routers;
