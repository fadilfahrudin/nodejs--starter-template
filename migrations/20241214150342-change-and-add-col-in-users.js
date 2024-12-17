'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
      after: 'id'
    })
    await queryInterface.addColumn('Users', 'password', {
      type: Sequelize.TEXT,
      allowNull: false,
      after: 'email'
    })
    await queryInterface.addColumn('Users', 'refreshToken', {
      type: Sequelize.TEXT,
      after: 'password'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'name')
    await queryInterface.removeColumn('Users', 'password')
    await queryInterface.removeColumn('Users', 'refreshToken')
  }
};
