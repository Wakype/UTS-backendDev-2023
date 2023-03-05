const { Op } = require('sequelize');
const checkQuery = require('../utils/queryString');
const PetugasModel = require('../models').petugas;
const models = require('../models');

async function getPetugas(req, res) {
  try {
    let {
      role,
      username,
      namaPetugas,
      page,
      pageSize,
      offset,
      sortBy = 'id',
      orderBy = 'ASC',
    } = req.query;

    let petugas = await PetugasModel.findAndCountAll({
      where: {
        ...(checkQuery(username) && {
          username: {
            [Op.substring]: username,
          },
        }),
        ...(checkQuery(namaPetugas) && {
          hargaAwal: {
            [Op.substring]: namaPetugas,
          },
        }),
      },
      include: [
        {
          model: models.level,
          require: true,
          as: 'role',
          attributes: ['id', 'level'],
          where: {
            ...(checkQuery(role) && {
              level: {
                [Op.substring]: role,
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
      msg: 'petugas OK',
      pagination: {
        currentPage: page,
        pageSize: pageSize,
        totalData: petugas.count,
      },
      data: petugas,
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

module.exports = { getPetugas };
