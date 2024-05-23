'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HostStatuses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pop_id: {
        type: Sequelize.INTEGER
      },
      user: {
        type: Sequelize.STRING
      },
      pop: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.STRING
      },
      downtime: {
        type: Sequelize.STRING
      },
      count: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('HostStatuses');
  }
};