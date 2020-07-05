'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('consumos', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'users', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        reagente_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'reagentes', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        quantidade_consumida : {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false
        },
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('consumos');

  }
};
