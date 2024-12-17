'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Hash password untuk admin user
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash('password123', salt);

    await queryInterface.bulkInsert('Users', [
      {
        name: 'John Doe',
        role: 'superadmin',
        username: 'johndoe',
        email: 'johndoe@email.com',
        password: hashedPassword,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jean Doe',
        role: 'user',
        username: 'jeandoe',
        email: 'jeandoe@email.com',
        password: hashedPassword,
        status: 'inactive',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
