'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Books', 'title', {
      type: Sequelize.STRING,
      allowNull: false,
      after: 'id'
    })
    await queryInterface.changeColumn('Books', 'author', {
      type: Sequelize.STRING,
      allowNull: false,
      after: 'title'
    })
    await queryInterface.changeColumn('Books', 'publisher', {
      type: Sequelize.STRING,
      allowNull: false,
      after: 'author'
    })
    await queryInterface.changeColumn('Books', 'genre', {
      type: Sequelize.STRING,
      allowNull: false,
      after: 'publisher'
    })
    await queryInterface.changeColumn('Books', 'createdAt', {
      type: Sequelize.DATE,
      defaultValue: new Date(),
      allowNull: false,
      after: 'genre'
    })
    await queryInterface.changeColumn('Books', 'updatedAt', {
      type: Sequelize.DATE,
      defaultValue: new Date(),
      allowNull: false,
      after: 'createdAt'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Books', 'title', {
      type: Sequelize.STRING,
      allowNull: false,
      after: 'id'
    })
    await queryInterface.changeColumn('Books', 'author', {
      type: Sequelize.STRING,
      allowNull: false,
      after: 'title'
    })
    await queryInterface.changeColumn('Books', 'publisher', {
      type: Sequelize.STRING,
      allowNull: false,
      after: 'author'
    })
    await queryInterface.changeColumn('Books', 'genre', {
      type: Sequelize.STRING,
      allowNull: false,
      after: 'publisher'
    })
    await queryInterface.changeColumn('Books', 'createdAt', {
      type: Sequelize.DATE,
      defaultValue: new Date(),
      allowNull: false,
      after: 'genre'
    })
    await queryInterface.changeColumn('Books', 'updatedAt', {
      type: Sequelize.DATE,
      defaultValue: new Date(),
      allowNull: false,
      after: 'createdAt'
    })
  }
};
