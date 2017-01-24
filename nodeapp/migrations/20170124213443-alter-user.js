'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'Users',
      'first_name',
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    );
    queryInterface.changeColumn(
      'Users',
      'last_name',
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    );
    queryInterface.changeColumn(
      'Users',
      'email',
      {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    // noop
  }
};
