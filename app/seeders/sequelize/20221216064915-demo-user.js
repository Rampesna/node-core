'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('users', [{
            name: 'Admin',
            email: 'admin@admin.com',
            password: bcrypt.hashSync('123456', 10),
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        }]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('users', null, {});
    }
};
