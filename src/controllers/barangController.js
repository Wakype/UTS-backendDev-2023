const { Op } = require('sequelize');
const checkQuery = require('../utils/queryString');

const BarangModel = require('../models').barang;

async function getBarang(req, res) {
  try {
    let {
      namaBarang,
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
        [Op.or]: [
          {
            namaBarang: {
              [Op.substring]: namaBarang,
            },
          },
          {
            hargaAwal: {
              [Op.gte]: hargaMinimal,
            },
          },
          {
            hargaAwal: {
              [Op.lte]: hargaMaximum,
            },
          },
        ],
      },
      limit: pageSize,
      offset: offset,
      order: [[sortBy, orderBy]],
    });
    res.json({
      status: '200',
      msg: 'barang OK',
      pagination: {
        currentPage: page,
        pageSize: pageSize,
        totalData: barang.count,

      },
      data: barang .rows,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      status: 'err',
      msg: err.message,
    });
  }
}

module.exports = { getBarang };
