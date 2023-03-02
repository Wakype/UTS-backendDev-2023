'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function up$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(queryInterface.createTable('lelangs', {
              id_lelang: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
              },
              id_barang: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                  model: 'barangs',
                  key: 'id_barang',
                  as: 'id_barang'
                }
              },
              id_user: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                  model: 'masyarakats',
                  key: 'id_user',
                  as: 'id_user'
                }
              },
              id_petugas: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                  model: 'petugas',
                  key: 'id_petugas',
                  as: 'id_petugas'
                }
              },
              tanggalLelang: {
                type: Sequelize.DATE,
                allowNull: false
              },
              hargaAkhir: {
                type: Sequelize.INTEGER(20),
                allowNull: false
              },
              status: {
                type: Sequelize.ENUM,
                allowNull: false,
                values: ['dibuka', 'ditutup']
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
            return regeneratorRuntime.awrap(queryInterface.dropTable('lelangs'));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};