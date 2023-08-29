'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PaymentMethod extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.Payment, { foreignKey: 'paymentMethodID' });
            this.belongsTo(models.User, { foreignKey: 'userID' });
        }
    }
    PaymentMethod.init(
        {
            paymentMethodID: {
                primaryKey: true,
                allowNull: false,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            userID: {
                allowNull: false,
                type: DataTypes.UUID,
                references: {
                    model: 'users',
                    key: 'userID',
                },
            },
            type: {
                allowNull: false,
                type: DataTypes.ENUM,
                values: ['Credit Card', 'PayPal', 'Bank Transfer'],
            },
            cardNumber: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
            expiryDate: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            cardHolderName: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            bankName: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            dateAdded: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            isActive: {
                allowNull: false,
                type: DataTypes.BOOLEAN,
            },
        },
        {
            sequelize,
            modelName: 'PaymentMethod',
        }
    );
    return PaymentMethod;
};
