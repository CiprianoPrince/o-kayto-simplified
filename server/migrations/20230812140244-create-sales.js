'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Sales', {
            saleID: {
                primaryKey: true,
                allowNull: false,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            orderID: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'orders',
                    key: 'orderID',
                },
            },
            paymentID: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'payments',
                    key: 'paymentID',
                },
            },
            userID: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'users',
                    key: 'userID',
                },
            },
            totalAmount: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            saleDate: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            status: {
                allowNull: false,
                type: Sequelize.ENUM,
                values: ['Complete', 'Partial', 'Refunded'],
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
        await queryInterface.dropTable('Sales');
    },
};
