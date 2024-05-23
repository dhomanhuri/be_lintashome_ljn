'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HostStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HostStatus.init({
    pop_id: DataTypes.INTEGER,
    user: DataTypes.STRING,
    pop: DataTypes.STRING,
    status: DataTypes.STRING,
    time: DataTypes.STRING,
    downtime: DataTypes.STRING,
    count: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'HostStatus',
  });
  return HostStatus;
};