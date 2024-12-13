'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Books', [
      {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        publisher: 'Charles Scribner\'s Sons',
        genre: 'Classic',
      },
      {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        publisher: 'J. B. Lippincott & Co.',
        genre: 'Classic',
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Books', null, {});
  }
};
