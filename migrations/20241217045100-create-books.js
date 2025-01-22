'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Books', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull:{
            msg: "Title is required"
          },
          notEmpty:{
            msg: "Title cannot be empty"
          }
        }
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull:{
            msg: "Author is required"
          },
          notEmpty:{
            msg: "Author cannot be empty"
          }
        }
      },
      publisher: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
          notNull:{
            msg: "Publisher is required"
          },
          notEmpty:{
            msg: "Publisher cannot be empty"
          }
        }
      },
      genre: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull:{
            msg: "Genre is required"
          },
          notEmpty:{
            msg: "Genre atleast one"
          }
        }
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
    await queryInterface.dropTable('Books');
  }
};
