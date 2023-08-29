'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Sales extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Order, { foreignKey: 'orderID' });
            this.belongsTo(models.Payment, { foreignKey: 'paymentID' });
            this.belongsTo(models.User, { foreignKey: 'userID' });
            this.hasOne(models.SaleDetail, { foreignKey: 'saleID' });
        }
    }
    Sales.init(
        {
            saleID: {
                primaryKey: true,
                allowNull: false,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            orderID: {
                allowNull: false,
                type: DataTypes.UUID,
                references: {
                    model: 'orders',
                    key: 'orderID',
                },
            },
            paymentID: {
                allowNull: false,
                type: DataTypes.UUID,
                references: {
                    model: 'payments',
                    key: 'paymentID',
                },
            },
            userID: {
                allowNull: false,
                type: DataTypes.UUID,
                references: {
                    model: 'users',
                    key: 'userID',
                },
            },
            totalAmount: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            saleDate: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            status: {
                allowNull: false,
                type: DataTypes.ENUM,
                values: ['Complete', 'Partial', 'Refunded'],
            },
        },
        {
            sequelize,
            modelName: 'Sales',
        }
    );
    return Sales;
};
