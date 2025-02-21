'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert('Books', [
        {
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          publisher: 'Charles Scribner\'s Sons',
          genre: 'Classic',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'To Kill a Mockingbird',
          author: 'Harper Lee',
          publisher: 'J. B. Lippincott & Co.',
          genre: 'Classic',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ])
    } catch (error) {
      console.error(error);
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Books', null, {});
  }
};
