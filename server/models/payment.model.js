'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Payment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Order, { foreignKey: 'orderID' });
            this.belongsTo(models.PaymentMethod, { foreignKey: 'paymentMethodID' });
            this.hasOne(models.Sales, { foreignKey: 'paymentID' });
            this.hasOne(models.Refund, { foreignKey: 'paymentID' });
        }
    }
    Payment.init(
        {
            paymentID: {
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
            paymentMethodID: {
                allowNull: false,
                type: DataTypes.UUID,
                references: {
                    model: 'paymentMethods',
                    key: 'paymentMethodID',
                },
            },
            amount: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            paymentDate: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            paymentStatus: {
                allowNull: false,
                type: DataTypes.ENUM,
                values: ['Pending', 'Completed', 'Failed', 'Refunded'],
            },
        },
        {
            sequelize,
            modelName: 'Payment',
        }
    );
    return Payment;
};
