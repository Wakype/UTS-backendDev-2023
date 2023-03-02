'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class historiLelang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  historiLelang.init({
    id_lelang: DataTypes.INTEGER,
    id_barang: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    penawaranHarga: DataTypes.INTEGER(20)
  }, {
    sequelize,
    modelName: 'historiLelang',
  });
  return historiLelang;
};