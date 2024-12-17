'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
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
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Books', null, {});
  }
};
