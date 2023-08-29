'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CartDetail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Cart, { foreignKey: 'cartID' });
            this.belongsTo(models.Product, { foreignKey: 'productID' });
        }
    }
    CartDetail.init(
        {
            cartDetailID: {
                primaryKey: true,
                allowNull: false,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            cartID: {
                allowNull: false,
                type: DataTypes.UUID,
                references: {
                    model: 'carts',
                    key: 'cartID',
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
        },
        {
            sequelize,
            modelName: 'CartDetail',
        }
    );
    return CartDetail;
};
