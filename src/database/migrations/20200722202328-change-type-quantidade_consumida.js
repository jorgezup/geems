'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.changeColumn(
      'consumos',
      'quantidade_consumida',
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
    'quantidade_consumida',
    {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  )
  }
};
