'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lelang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      lelang.hasOne(models.barang, { as: 'barang', foreignKey: 'id_petugas' });
    }
  }
  lelang.init({
    id_barang: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    id_petugas: DataTypes.INTEGER,
    tanggalLelang: DataTypes.DATE,
    hargaAkhir: DataTypes.INTEGER(20),
    status: DataTypes.ENUM('dibuka', 'ditutup')
  }, {
    sequelize,
    modelName: 'lelang',
  });
  return lelang;
};