"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("BulkPops", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
            },
            host: {
                type: Sequelize.STRING,
            },
            user: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
            port: {
                type: Sequelize.STRING,
            },
            total: {
                type: Sequelize.STRING,
            },
            online: {
                type: Sequelize.STRING,
            },
            offline: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable("BulkPops");
    },
};
