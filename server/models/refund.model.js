'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Refund extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Payment, { foreignKey: 'paymentID' });
        }
    }
    Refund.init(
        {
            refundID: {
                primaryKey: true,
                allowNull: false,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            paymentID: {
                allowNull: false,
                type: DataTypes.UUID,
                references: {
                    model: 'payments',
                    key: 'paymentID',
                },
            },
            amount: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            refundDate: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            reason: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            status: {
                allowNull: false,
                type: DataTypes.ENUM,
                values: ['Pending', 'Completed'],
            },
        },
        {
            sequelize,
            modelName: 'Refund',
        }
    );
    return Refund;
};
