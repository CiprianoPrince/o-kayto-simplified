'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('PaymentMethods', {
            paymentMethodID: {
                primaryKey: true,
                allowNull: false,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            userID: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'users',
                    key: 'userID',
                },
                onDelete: 'CASCADE',
            },
            type: {
                allowNull: false,
                type: Sequelize.ENUM,
                values: ['Credit Card', 'PayPal', 'Bank Transfer'],
            },
            cardNumber: {
                allowNull: false,
                type: Sequelize.BIGINT,
            },
            expiryDate: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            cardHolderName: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            bankName: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            dateAdded: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            isActive: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
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
        await queryInterface.dropTable('PaymentMethods');
    },
};
