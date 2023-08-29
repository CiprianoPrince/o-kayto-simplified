'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SaleDetail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Sales, { foreignKey: 'saleID' });
            this.belongsTo(models.Product, { foreignKey: 'productID' });
        }
    }
    SaleDetail.init(
        {
            saleDetailID: {
                primaryKey: true,
                allowNull: false,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            saleID: {
                allowNull: false,
                type: DataTypes.UUID,
                references: {
                    model: 'sales',
                    key: 'saleID',
                },
            },
            productID: {
                allowNull: false,
                type: DataTypes.UUID,
                references: {
                    model: 'products',
                    key: 'productID',
                },
            },
            quantity: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            pricePerUnit: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            discount: {
                allowNull: true,
                type: DataTypes.INTEGER,
            },
            totalPrice: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
        },
        {
            sequelize,
            modelName: 'SaleDetail',
        }
    );
    return SaleDetail;
};
