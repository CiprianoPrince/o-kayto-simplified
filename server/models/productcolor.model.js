'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProductColor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    ProductColor.init(
        {
            productID: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'products',
                    key: 'productID',
                },
            },
            colorID: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'colors',
                    key: 'colorID',
                },
            },
        },
        {
            sequelize,
            modelName: 'ProductColor',
            freezeTableName: true,
            tableName: 'productcolors',
        }
    );
    return ProductColor;
};
