'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('PersonelAccessTokens', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT.UNSIGNED
            },
            tokenableType: {
                type: Sequelize.STRING
            },
            tokenableId: {
                type: Sequelize.BIGINT.UNSIGNED
            },
            token: {
                type: Sequelize.STRING
            },
            userAgent: {
                type: Sequelize.STRING
            },
            lastUsedAt: {
                allowNull: true,
                type: Sequelize.DATE
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            deletedAt: {
                allowNull: true,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('PersonelAccessTokens');
    }
};
