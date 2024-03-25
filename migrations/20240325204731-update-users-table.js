"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "profileImage", {
      type: Sequelize.STRING,
      get() {
        return `https://avatar.iran.liara.run/username?username=${encodeURIComponent(
          this.firstName
        )}+${encodeURIComponent(this.lastName)}`;
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "profileImage");
  },
};
