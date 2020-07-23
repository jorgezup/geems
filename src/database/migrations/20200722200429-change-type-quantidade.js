'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.changeColumn(
      'reagentes',
      'quantidade',
      {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0
      }
    )
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.changeColumn(
    'reagentes',
    'quantidade',
    {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  )
  }
};
