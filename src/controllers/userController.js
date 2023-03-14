const { Op } = require('sequelize');
const checkQuery = require('../utils/queryString');
const PetugasModel = require('../models').petugas;
const levelModel = require('../models').level;
const models = require('../models');
const { sequelize } = require('../models');

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

async function getDetailPetugasById(req, res) {
  let { id } = req.params;

  const user = await PetugasModel.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: models.level,
        require: true,
        as: 'role',
        attributes: ['id', 'level'],
      },
    ],
  });

  if (user === null) {
    res.status(404).json({
      status: 404,
      msg: 'User tidak ditemukan',
    });
  }
  try {
    res.json({
      status: 'Success',
      msg: 'Petugas ditemukan',
      data: user,
    });
  } catch (err) {
    res.status(403).json({
      status: 'Fail',
      msg: 'ada kesalahan',
    });
  }
}

async function updatePetugas(req, res) {
  const { id, namaPetugas, username, role } = req.body;
  let db_transaction;

  try {
    db_transaction = await sequelize.transaction();
    const [updatedPetugas, updatedLevel] = await Promise.all([
      PetugasModel.update(
        {
          namaPetugas,
          username,
        },
        {
          where: {
            id,
          },
          transaction: db_transaction,
        }
      ),
      levelModel.update(
        {
          level: role,
        },
        {
          where: {
            id: req.id_level,
          },
          transaction: db_transaction,
        }
      ),
    ]);

    await db_transaction.commit();

    const user = await PetugasModel.findOne({
      where: {
        id,
      },
      include: [
        {
          model: models.level,
          require: true,
          as: 'role',
          attributes: ['id', 'level'],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({
        status: 'Fail',
        msg: 'Petugas tidak ditemukan',
      });
    }

    return res.json({
      status: 'Success',
      msg: 'Petugas telah diupdate',
      user,
    });

  } catch (err) {
    if(db_transaction) await db_transaction.rollback();
    return res.status(403).json({
      status: 'Fail',
      msg: 'ada kesalahan',
    });
  }
}


module.exports = { getPetugas, getDetailPetugasById, updatePetugas };
