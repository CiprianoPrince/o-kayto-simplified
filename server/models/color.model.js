'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Color extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsToMany(models.Product, {
                through: 'ProductColor',
                foreignKey: 'colorID',
            });
        }
    }
    Color.init(
        {
            colorID: {
                primaryKey: true,
                allowNull: false,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            modelName: 'Color',
        }
    );
    return Color;
};
