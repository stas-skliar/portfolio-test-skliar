'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('images', 'imagePath', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue:
        'https://portfolio-test-skliar.s3.eu-north-1.amazonaws.com/images/9fc3de40-830e-496d-8222-6dc2dd59c1d5.jpg',
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
