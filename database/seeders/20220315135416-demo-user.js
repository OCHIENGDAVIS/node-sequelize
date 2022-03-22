'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstname: 'John',
          lastname: 'Doe',
          email: 'Doe@gmail.com',
          password: 'pass123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstname: 'Davis',
          lastname: 'Ochieng',
          email: 'ochieng@gmail.com',
          password: 'pass123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
