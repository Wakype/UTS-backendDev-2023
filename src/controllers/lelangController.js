const LelangModel = require('../models').lelang;
const dayjs = require('dayjs');
const { Op } = require('sequelize');
const checkQuery = require('../utils/queryString');
const models = require('../models');

async function getLelang(req, res) {
  try {
    let {
      keyword,
      page,
      pageSize,
      offset,
      hargaMinimal,
      hargaMaximum,
      sortBy = 'id',
      orderBy = 'ASC',
      isMine,
    } = req.query;

    let lelang = await LelangModel.findAndCountAll({
      where: {
        ...(checkQuery(isMine) &&
          isMine == 'true' && {
            id_petugas: req.id,
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
      include: [
        {
          model: models.barang,
          require: true,
          as: 'barang',
          where: {
            ...(checkQuery(keyword) && {
              namaBarang: {
                [Op.substring]: keyword,
              },
            }),
          },
        },
      ],
      limit: pageSize,
      offset: offset,
      order: [[sortBy, orderBy]],
    });
    res.json({
      status: 'Success',
      msg: 'Lelang OK',
      pagination: {
        currentPage: page,
        pageSize: pageSize,
        totalData: lelang.count,
      },
      data: lelang,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      status: 'Fail',
      msg: 'Gagal mendapatkan lelang',
      err: err.message,
    });
  }
}

module.exports = { getLelang };
