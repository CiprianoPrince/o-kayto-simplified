'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Inventory extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Product, { foreignKey: 'productID', onDelete: 'CASCADE' });
        }
    }
    Inventory.init(
        {
            inventoryID: {
                primaryKey: true,
                allowNull: false,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            productID: {
                allowNull: false,
                type: DataTypes.UUID,
                references: {
                    model: 'products',
                    key: 'productID',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            quantityInStock: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            reOrderThreshold: {
                allowNull: true,
                type: DataTypes.INTEGER,
            },
            lastRestockDate: {
                allowNull: true,
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            modelName: 'Inventory',
        }
    );
    return Inventory;
};
