const { Op } = require('sequelize');
const checkQuery = require('../utils/queryString');
const dayjs = require('dayjs');
const models = require('../models');

const { sequelize } = require('../models');
const BarangModel = require('../models').barang;
const LelangModel = require('../models').lelang;

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
      isMine,
    } = req.query;

    let barang = await BarangModel.findAndCountAll({
      where: {
        ...(checkQuery(isMine) &&
          isMine == 'true' && {
            id_petugas: req.id,
          }),
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
      // include: [
      //   {
      //     model: models.petugas,
      //     require: true,
      //     as: 'barangMilik',
      //     // attributes: ['id', 'level'],
      //     where: {
      //       ...(checkQuery(keyword) && {
      //         namaBarang: {
      //           [Op.substring]: keyword,
      //         },
      //       }),
      //     },
      //   },
      // ],
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
  let { namaBarang, deskripsiBarang, hargaAwal } = req.body;
  let db_transaction = await sequelize.transaction();
  const now = dayjs();
  try {
    let { id } = await BarangModel.create(
      {
        id_petugas: req?.id,
        namaBarang: namaBarang,
        deskripsiBarang: deskripsiBarang,
        hargaAwal: hargaAwal,
        tanggal: now,
      },
      { transaction: db_transaction }
    );

    await LelangModel.create(
      {
        id_barang: id,
        id_user: null,
        id_petugas: req?.id,
        tanggalLelang: now,
        hargaAkhir: hargaAwal,
        status: 'dibuka',
      },
      { transaction: db_transaction }
    );

    res.status(201).json({
      status: 'Success',
      msg: 'Barang berhasil ditambah',
    });
    db_transaction.commit();
  } catch (err) {
    console.log(err);
    res.status(403).json({
      status: 'Fail',
      msg: 'Gagal menambah barang',
      err: err.message,
    });
    db_transaction.rollback();
  }
}

async function deleteBarang(req, res) {
  let { id } = req.params;

  try {
    const barang = await BarangModel.findByPk(id);

    if (barang === null) {
      return res.status(404).json({
        status: 404,
        msg: 'Barang tidak ditemukan',
      });
    }

    await BarangModel.destroy({
      where: {
        id: id,
      },
    });

    res.status(201).json({
      status: 'Success',
      msg: 'Barang berhasil dihapus',
    });
  } catch (err) {
    res.status(403).json({
      status: 'Fail',
      msg: 'Gagal menghapus barang',
      err: err.message,
    });
  }
}

async function updateBarang(req, res) {
  let { id, namaBarang, deskripsiBarang, hargaAwal } = req.body;

  try {
    await BarangModel.update(
      {
        id: id,
        namaBarang: namaBarang,
        deskripsiBarang: deskripsiBarang,
        hargaAwal: hargaAwal,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.json({
      status: 'Success',
      msg: 'Barang telah diupdate',
    });
  } catch (err) {
    res.status(403).json({
      status: 'Fail',
      msg: 'ada kesalahan',
    });
  }
}

async function getBarangById(req, res) {
  let { id } = req.params;

  try {
    const barang = await BarangModel.findOne({
      where: {
        id: id,
      },
    });

    if (barang === null) {
      res.status(404).json({
        status: 404,
        msg: 'Barang tidak ditemukan',
      });
    }

    res.json({
      status: 'Success',
      msg: 'Barang ditemukan',
      data: barang,
    });
  } catch (err) {
    res.status(403).json({
      status: 'Fail',
      msg: 'ada kesalahan',
    });
  }
}

module.exports = {
  getBarang,
  createBarang,
  deleteBarang,
  updateBarang,
  getBarangById,
};
