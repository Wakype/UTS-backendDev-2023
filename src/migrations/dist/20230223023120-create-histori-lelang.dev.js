'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function up$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(queryInterface.createTable('historiLelangs', {
              id_histori: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
              },
              id_lelang: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                  model: 'lelangs',
                  key: 'id_lelang',
                  as: 'id_lelang'
                }
              },
              id_barang: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                  model: 'barangs',
                  key: 'id_barang',
                  as: 'id_barang'
                }
              },
              id_user: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                  model: 'masyarakats',
                  key: 'id_user',
                  as: 'id_user'
                }
              },
              penawaranHarga: {
                allowNull: false,
                type: Sequelize.INTEGER(20)
              },
              createdAt: {
                allowNull: false,
                type: Sequelize.DATE
              },
              updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
              }
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  down: function down(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function down$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(queryInterface.dropTable('historiLelangs'));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};