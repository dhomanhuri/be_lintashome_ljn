"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class BulkPop extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    BulkPop.init(
        {
            name: DataTypes.STRING,
            host: DataTypes.STRING,
            user: DataTypes.STRING,
            password: DataTypes.STRING,
            port: DataTypes.STRING,
            total: DataTypes.STRING,
            online: DataTypes.STRING,
            offline: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "BulkPop",
        }
    );
    return BulkPop;
};
