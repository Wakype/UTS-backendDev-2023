'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('lelangs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_barang: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'barangs',
          key: 'id',
          as: 'id_barang',
        },
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'masyarakats',
          key: 'id',
          as: 'id_user',
        },
      },
      id_petugas: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'petugas',
          key: 'id',
          as: 'id_petugas',
        },
      },
      tanggalLelang: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      hargaAkhir: {
        type: Sequelize.INTEGER(20),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['dibuka', 'ditutup'],
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('lelangs');
  },
};
