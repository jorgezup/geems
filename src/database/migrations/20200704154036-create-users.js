'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nome : {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email : {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password : {
        type: Sequelize.STRING,
        allowNull: false,
      },
      passaporte : {
        type: Sequelize.STRING,
        allowNull: false,
      },
      papel_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'roles', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      is_admin : {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      reset_token : {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      reset_token_expires : {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      disabled : {
        type: Sequelize.BOOLEAN,
        allowNull: true
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
      return queryInterface.dropTable('users');
  }
};
