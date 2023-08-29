'use strict';
const readJsonFile = require('../utils/readJsonFile');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
     * Add seed commands here.
     *
     Example:
     */
        await queryInterface.bulkInsert(
            'Users',
            await readJsonFile('./storage/data/users.json'),
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Users', null, {});
    },
};
