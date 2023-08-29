'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class WishlistDetail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Wishlist, { foreignKey: 'wistlistID' });
            this.belongsTo(models.Product, { foreignKey: 'productID' });
        }
    }
    WishlistDetail.init(
        {
            wishlistDetailID: {
                primaryKey: true,
                allowNull: false,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            wistlistID: {
                allowNull: false,
                type: DataTypes.UUID,
                references: {
                    model: 'wishlists',
                    key: 'wistlistID',
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
        },
        {
            sequelize,
            modelName: 'WishlistDetail',
        }
    );
    return WishlistDetail;
};
