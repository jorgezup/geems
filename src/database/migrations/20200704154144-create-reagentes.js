'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('reagentes', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        nome_comum : {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        nome_oficial : {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        formula_molecular : {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        marca : {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        lote : {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        validade : {
          type: Sequelize.DATE,
          allowNull: false,
        },
        estado : {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        quantidade : {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        localizacao : {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        incompatibilidade : {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        controlado : {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        orgao : {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        info_adicionais : {
          type: Sequelize.TEXT,
          allowNull: true,
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
      return queryInterface.dropTable('reagentes');

  }
};
