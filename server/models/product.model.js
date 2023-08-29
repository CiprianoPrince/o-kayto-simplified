'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Category, { foreignKey: 'categoryID' });
            this.hasMany(models.CartDetail, { foreignKey: 'productID' });
            this.hasMany(models.OrderDetail, { foreignKey: 'productID' });
            this.hasMany(models.WishlistDetail, { foreignKey: 'productID' });
            this.hasMany(models.SaleDetail, { foreignKey: 'saleID' });
            this.hasOne(models.ProductImage, { foreignKey: 'productID' });
            this.hasOne(models.Inventory, { foreignKey: 'productID' });
            this.belongsToMany(models.Size, {
                through: 'ProductSize',
                foreignKey: 'productID',
            });
            this.belongsToMany(models.Color, {
                through: 'ProductColor',
                foreignKey: 'productID',
            });
        }
    }
    Product.init(
        {
            productID: {
                primaryKey: true,
                allowNull: false,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            description: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            price: {
                allowNull: false,
                type: DataTypes.DECIMAL(10, 2),
            },
            categoryID: {
                allowNull: false,
                type: DataTypes.UUID,
                references: {
                    model: 'categories',
                    key: 'categoryID',
                },
            },
        },
        {
            sequelize,
            modelName: 'Product',
            hooks: {
                afterCreate: async (product, options) => {
                    const { sequelize } = product;

                    // Accessing extra data from options
                    const imageData = options.extraData.image;
                    const inventoryData = options.extraData.inventory;
                    const sizeData = options.extraData.size;
                    const colorData = options.extraData.color;

                    // Create associated Image
                    await sequelize.models.ProductImage.create({
                        ...imageData,
                        productID: product.productID,
                    });
                    await sequelize.models.Inventory.create({
                        ...inventoryData,
                        productID: product.productID,
                    });
                    await sequelize.models.ProductSize.create({
                        sizeID: sizeData.sizeID,
                        productID: product.productID,
                    });
                    await sequelize.models.ProductColor.create({
                        colorID: colorData.colorID,
                        productID: product.productID,
                    });
                },
                beforeDestroy: async (product, options) => {
                    const { sequelize } = product;

                    // Delete associated Variants
                    await sequelize.models.Variant.destroy({
                        where: { productID: product.productID },
                    });
                },
            },
        }
    );
    return Product;
};
