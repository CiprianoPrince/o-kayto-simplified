'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.User, { foreignKey: 'userID' });
            this.hasMany(models.OrderDetail, { foreignKey: 'orderID' });
            this.hasMany(models.Payment, { foreignKey: 'orderID' });
            this.hasOne(models.Sales, { foreignKey: 'orderID' });
        }
    }
    Order.init(
        {
            orderID: {
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
            dateOrdered: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            shippingAddress: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            totalPrice: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            status: {
                allowNull: false,
                type: DataTypes.ENUM,
                values: ['Processing', 'Shipped', 'Delivered'],
            },
        },
        {
            sequelize,
            modelName: 'Order',
        }
    );
    return Order;
};
