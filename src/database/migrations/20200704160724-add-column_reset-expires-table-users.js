'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
			'users',
			'reset_expires',
			{
        type: Sequelize.INTEGER,
        allowNull: true,
			},
		);
  },

  down: (queryInterface, Sequelize) => { 
      return queryInterface.removeColumn(
			'users',
			'reset_expires',
		);
  }
};