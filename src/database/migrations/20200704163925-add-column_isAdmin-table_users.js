'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
			'users',
			'is_admin',
			{
        type: Sequelize.BOOLEAN,
        allowNull: false,
			},
		);
  },

  down: (queryInterface, Sequelize) => { 
      return queryInterface.removeColumn(
			'users',
			'is_admin',
		);
  }
};