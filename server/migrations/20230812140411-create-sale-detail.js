'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('SaleDetails', {
            saleDetailID: {
                primaryKey: true,
                allowNull: false,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            saleID: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'sales',
                    key: 'saleID',
                },
            },
            productID: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'products',
                    key: 'productID',
                },
            },
            quantity: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            pricePerUnit: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            discount: {
                allowNull: true,
                type: Sequelize.INTEGER,
            },
            totalPrice: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('SaleDetails');
    },
};
