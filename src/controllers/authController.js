require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const dayjs = require('dayjs');
const { register } = require('../services/registration-service');
const MasyarakatModel = require('../models').masyarakat;
const PetugasModel = require('../models').petugas;
const LevelModel = require('../models').level;

async function registerAuth(req, res) {
  let payload = req.body;
    let { namaLengkap, namaPetugas, password, username, telp, role } = payload;

    register({namaLengkap, namaPetugas, password, username, telp, role}).then(result => {
      console.log('resultnya', result)
      res.status(201).json({
        status: 'Success',
        msg: 'register successfully',
      });
    }).catch(err => {
      res.status(403).json({
        // e: err,
        status: 'Fail',
        msg: err.message,
      });
    })
}
async function loginAuth(req, res) {
  try {
    let payload = req.body;
    let { namaLengkap, namaPetugas, password } = payload;

    
  } catch (err) {
    res.status(403).json({
      status: 'error',
      msg: 'failed to login',
    });
  }
}

module.exports = { registerAuth, loginAuth };
