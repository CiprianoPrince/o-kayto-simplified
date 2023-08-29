'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Review extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.User, { foreignKey: 'userID' });
            this.belongsTo(models.Product, { foreignKey: 'productID' });
        }
    }
    Review.init(
        {
            reviewID: {
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
            productID: {
                allowNull: false,
                type: DataTypes.UUID,
                references: {
                    model: 'products',
                    key: 'productID',
                },
            },
            rating: {
                allowNull: true,
                type: DataTypes.INTEGER,
                validate: {
                    isIn: {
                        args: [[1, 2, 3, 4, 5]],
                        msg: 'Invalid value for rating',
                    },
                },
            },
            comment: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            datePosted: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            modelName: 'Review',
        }
    );
    return Review;
};
