'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
			'users',
			'reset',
			{
        type: Sequelize.INTEGER,
        allowNull: true,
			},
		);
  },

  down: (queryInterface, Sequelize) => { 
      return queryInterface.removeColumn(
			'users',
			'reset',
		);
  }
};