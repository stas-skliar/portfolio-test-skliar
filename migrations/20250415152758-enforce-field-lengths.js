'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // USERS
    await queryInterface.changeColumn('users', 'name', {
      type: Sequelize.STRING(100),
      allowNull: false,
    });

    await queryInterface.changeColumn('users', 'email', {
      type: Sequelize.STRING(150),
      allowNull: false,
      unique: true,
    });

    await queryInterface.changeColumn('users', 'password', {
      type: Sequelize.STRING(255),
      allowNull: false,
    });

    // PORTFOLIOS
    await queryInterface.changeColumn('portfolios', 'name', {
      type: Sequelize.STRING(100),
      allowNull: false,
    });

    await queryInterface.changeColumn('portfolios', 'description', {
      type: Sequelize.STRING(300),
      allowNull: true,
    });

    // IMAGES
    await queryInterface.changeColumn('images', 'name', {
      type: Sequelize.STRING(100),
      allowNull: false,
    });

    await queryInterface.changeColumn('images', 'description', {
      type: Sequelize.STRING(300),
      allowNull: true,
    });

    // COMMENTS
    await queryInterface.changeColumn('comments', 'text', {
      type: Sequelize.STRING(500),
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    // USERS
    await queryInterface.changeColumn('users', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn('users', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });

    await queryInterface.changeColumn('users', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // PORTFOLIOS
    await queryInterface.changeColumn('portfolios', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn('portfolios', 'description', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // IMAGES
    await queryInterface.changeColumn('images', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn('images', 'description', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // COMMENTS
    await queryInterface.changeColumn('comments', 'text', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
