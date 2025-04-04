'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        }
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      status:{
        type: Sequelize.ENUM,
        values: ['active', 'inactive'],
        allowNull: false,
        defaultValue: 'inactive'
      },
      roleId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Roles', // Nama tabel Role
          key: 'id', // Kolom primary key Role
        }
      },
      refreshToken: {
        type: Sequelize.TEXT,
        allowNull: true
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
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
