const MasyarakatModel = require('../models').masyarakat;
const PetugasModel = require('../models').petugas;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { sequelize } = require('../models');

async function register({
  namaLengkap,
  namaPetugas,
  telp,
  username,
  password,
  role,
}) {
  const hashPassword = bcrypt.hashSync(password, 10);

  try {
    if (namaPetugas === '' || namaPetugas === undefined) {
      const result = await MasyarakatModel.create({
        namaLengkap: namaLengkap,
        username: username,
        telp: telp,
        password: hashPassword,
      });

      return result;
    }

    // const db_transaction = await sequelize.transaction();
    // const { id } = await LevelModel.create(
    //   {
    //     level: 'administrator',
    //   },
    //   { transaction: db_transaction }
    // );

    const result = await PetugasModel.create(
      {
        namaPetugas: namaPetugas,
        username: username,
        password: hashPassword,
        id_level: role,
      }
      // { transaction: db_transaction }
    );
    // db_transaction.commit();
    return result;
  } catch (error) {
    // db_transaction.rollback();
    throw error;
  }
}

async function login({ username, password, req, res }) {
  try {
    const masyarakat = await MasyarakatModel.findOne({
      where: {
        username: username,
      },
    });
    const petugas = await PetugasModel.findOne({
      where: {
        username: username,
      },
    });

    if (masyarakat === null && petugas === null) {
      return res.status(422).json({
        status: 422,
        msg: 'Username tidak ditemukan silahkan register',
      });
    }
    if (password === null) {
      return res.status(422).json({
        status: 422,
        msg: 'Email & Password tidak dicocok',
      });
    }
    if (masyarakat !== null) {
      const verify = await bcrypt.compareSync(password, masyarakat.password);

      if (!verify) {
        return res.status(422).json({
          status: 422,
          msg: 'Username & Password tidak dicocok',
        });
      }

      const token = jwt.sign(
        {
          id: masyarakat?.id,
          username: masyarakat?.username,
          namaLengkap: masyarakat?.namaLengkap,
          telp: masyarakat?.telp,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '7d',
        }
      );

      res.json({
        status: 'Success',
        msg: 'successfully login',
        token: token,
        user: masyarakat,
      });
    } else {
      const verify = await bcrypt.compareSync(password, petugas.password);

      if (!verify) {
        return res.status(422).json({
          status: 422,
          msg: 'Username & Password tidak dicocok',
        });
      }

      const token = jwt.sign(
        {
          id: petugas?.id,
          username: petugas?.username,
          namaPetugas: petugas?.namaPetugas,
          role: petugas?.role
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '7d',
        }
      );

      res.json({
        status: 'Success',
        msg: 'successfully login',
        token: token,
        user: petugas,
      });
    }

    // if (namaPetugas === '' || namaPetugas === undefined) {
    //   const masyarakat = await MasyarakatModel.findOne({
    //     where: {
    //       namaLengkap: namaLengkap,
    //     },
    //   });

    //   if (masyarakat === null) {
    //     return res.status(422).json({
    //       status: 422,
    //       msg: 'Email tidak ditemukan silahkan register',
    //     });
    //   }

    //   if (password === null) {
    //     return res.status(422).json({
    //       status: 422,
    //       msg: 'Email & Password tidak dicocok',
    //     });
    //   }

    //   const verify = await bcrypt.compareSync(password, masyarakat.password);

    //   if (!verify) {
    //     return res.status(422).json({
    //       status: 422,
    //       msg: 'Email & Password tidak dicocok',
    //     });
    //   }

    //   const token = jwt.sign(
    //     {
    //       id: masyarakat?.id,
    //       username: masyarakat?.username,
    //       namaLengkap: masyarakat?.namaLengkap,
    //       telp: masyarakat?.telp,
    //     },
    //     process.env.JWT_SECRET,
    //     {
    //       expiresIn: '7d',
    //     }
    //   );

    //   res.json({
    //     status: 'Success',
    //     msg: 'successfully login',
    //     token: token,
    //     user: masyarakat,
    //   });
    // } else {
    //   const petugas = await PetugasModel.findOne({
    //     where: {
    //       namaPetugas: namaPetugas,
    //     },
    //   });

    //   if (petugas === null) {
    //     return res.status(422).json({
    //       status: 422,
    //       msg: 'Email tidak ditemukan silahkan register',
    //     });
    //   }

    //   if (password === null) {
    //     return res.status(422).json({
    //       status: 422,
    //       msg: 'Email & Password tidak dicocok',
    //     });
    //   }

    //   const verify = await bcrypt.compareSync(password, petugas.password);

    //   if (!verify) {
    //     return res.status(422).json({
    //       status: 422,
    //       msg: 'Email & Password tidak dicocok',
    //     });
    //   }

    //   const token = jwt.sign(
    //     {
    //       id: petugas?.id,
    //       username: petugas?.username,
    //       namaPetugas: petugas?.namaPetugas,
    //       role: petugas?.role
    //     },
    //     process.env.JWT_SECRET,
    //     {
    //       expiresIn: '7d',
    //     }
    //   );

    //   res.json({
    //     status: 'Success',
    //     msg: 'successfully login',
    //     token: token,
    //     user: petugas,
    //   });
    // }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = {
  register,
  login,
};
