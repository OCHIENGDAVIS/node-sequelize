'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Posts',
      [
        {
          title: 'First post in the vicinity',
          body: 'This is the best post evenr',
          image:
            'https://www.freecodecamp.org/news/content/images/2021/08/chris-ried-ieic5Tq8YMk-unsplash.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Programming should be made easier ',
          body: 'The heart of programming ',
          image:
            'https://www.freecodecamp.org/news/content/images/2021/08/chris-ried-ieic5Tq8YMk-unsplash.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Node js is the best ',
          body: 'This is the best post ever',
          image:
            'https://www.freecodecamp.org/news/content/images/2021/08/chris-ried-ieic5Tq8YMk-unsplash.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {});
  },
};
