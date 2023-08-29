'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProductSize extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    ProductSize.init(
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
            sizeID: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'sizes',
                    key: 'sizeID',
                },
            },
        },
        {
            sequelize,
            modelName: 'ProductSize',
            freezeTableName: true,
            tableName: 'productsizes',
        }
    );
    return ProductSize;
};
