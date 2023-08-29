'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Wishlist extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.User, { foreignKey: 'userID' });
        }
    }
    Wishlist.init(
        {
            wistlistID: {
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
        },
        {
            sequelize,
            modelName: 'Wishlist',
        }
    );
    return Wishlist;
};
