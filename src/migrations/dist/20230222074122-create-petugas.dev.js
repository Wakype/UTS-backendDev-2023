'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function up$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(queryInterface.createTable('petugas', {
              id_petugas: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
              },
              id_level: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                references: {
                  model: 'levels',
                  key: 'id_level',
                  as: 'id_level'
                }
              },
              namaPetugas: {
                type: Sequelize.STRING(25),
                allowNull: false
              },
              username: {
                type: Sequelize.STRING(25),
                allowNull: false
              },
              password: {
                type: Sequelize.STRING(25),
                allowNull: false
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
            return regeneratorRuntime.awrap(queryInterface.dropTable('petugas'));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};