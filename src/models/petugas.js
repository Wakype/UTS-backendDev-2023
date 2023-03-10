'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class petugas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // petugas.belongsTo(models.barang, { as: 'barangMilik', foreignKey: 'id_petugas })
      petugas.hasOne(models.level, { as: 'role', foreignKey: 'id' });
    }
  }
  petugas.init({
    id_level: DataTypes.INTEGER,
    namaPetugas: DataTypes.STRING(25),
    username: DataTypes.STRING(25),
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'petugas',
  });
  return petugas;
};