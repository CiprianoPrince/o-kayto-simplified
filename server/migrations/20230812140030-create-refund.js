'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Refunds', {
            refundID: {
                primaryKey: true,
                allowNull: false,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            paymentID: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'payments',
                    key: 'paymentID',
                },
            },
            amount: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            refundDate: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            reason: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            status: {
                allowNull: false,
                type: Sequelize.ENUM,
                values: ['Pending', 'Completed'],
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
        await queryInterface.dropTable('Refunds');
    },
};
