'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('historiLelangs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_lelang: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'lelangs',
          key: 'id',
          as: 'id_lelang',
        },
      },
      id_barang: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'barangs',
          key: 'id',
          as: 'id_barang',
        },
      },
      id_user: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'masyarakats',
          key: 'id',
          as: 'id_user',
        },
      },
      penawaranHarga: {
        allowNull: false,
        type: Sequelize.INTEGER(20),
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
    await queryInterface.dropTable('historiLelangs');
  },
};
