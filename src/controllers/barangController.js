const { Op } = require('sequelize');
const checkQuery = require('../utils/queryString');
const dayjs = require('dayjs');

const BarangModel = require('../models').barang;

async function getBarang(req, res) {
  try {
    let {
      keyword,
      hargaMinimal,
      hargaMaximum,
      page,
      pageSize,
      offset,
      sortBy = 'id',
      orderBy = 'ASC',
    } = req.query;

    let barang = await BarangModel.findAndCountAll({
      where: {
        ...(checkQuery(keyword) && {
          namaBarang: {
            [Op.substring]: keyword,
          },
        }),
        ...(checkQuery(hargaMinimal) && {
          hargaAwal: {
            [Op.gte]: hargaMinimal,
          },
        }),
        ...(checkQuery(hargaMaximum) && {
          hargaAwal: {
            [Op.lte]: hargaMaximum,
          },
        }),
      },
      limit: pageSize,
      offset: offset,
      order: [[sortBy, orderBy]],
    });
    res.json({
      status: 'Success',
      msg: 'barang OK',
      pagination: {
        currentPage: page,
        pageSize: pageSize,
        totalData: barang.count,
      },
      data: barang,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      status: 'Fail',
      msg: 'Gagal mendapatkan barang',
      err: err.message,
    });
  }
}

async function createBarang(req, res) {
  try {
    let { namaBarang, deskripsiBarang, hargaAwal } = req.body;
    const now = dayjs()

    await BarangModel.create({
      id_petugas: req.id,
      namaBarang: namaBarang,
      deskripsiBarang: deskripsiBarang,
      hargaAwal: hargaAwal,
      tanggal: now,
    });

    res.status(201).json({
      status: 'Success',
      msg: 'Barang berhasil ditambah',
    });
  } catch (err) {
    res.status(403).json({
      status: 'Fail',
      msg: 'Gagal menambah barang',
      err: err.message,
    });
  }
}

module.exports = { getBarang, createBarang };
