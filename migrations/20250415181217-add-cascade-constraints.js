'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 🔁 1. portfolios.userId → users.id
    await queryInterface.removeConstraint('portfolios', 'portfolios_userId_fkey').catch(() => {});
    await queryInterface.addConstraint('portfolios', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_portfolios_userId',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // 🖼 2. images.portfolioId → portfolios.id
    await queryInterface.removeConstraint('images', 'images_portfolioId_fkey').catch(() => {});
    await queryInterface.addConstraint('images', {
      fields: ['portfolioId'],
      type: 'foreign key',
      name: 'fk_images_portfolioId',
      references: {
        table: 'portfolios',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // 💬 3. comments.imageId → images.id
    await queryInterface.removeConstraint('comments', 'comments_imageId_fkey').catch(() => {});
    await queryInterface.addConstraint('comments', {
      fields: ['imageId'],
      type: 'foreign key',
      name: 'fk_comments_imageId',
      references: {
        table: 'images',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // 👤 4. comments.userId → users.id
    await queryInterface.removeConstraint('comments', 'comments_userId_fkey').catch(() => {});
    await queryInterface.addConstraint('comments', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_comments_userId',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint('portfolios', 'fk_portfolios_userId');
    await queryInterface.removeConstraint('images', 'fk_images_portfolioId');
    await queryInterface.removeConstraint('comments', 'fk_comments_imageId');
    await queryInterface.removeConstraint('comments', 'fk_comments_userId');
  },
};
