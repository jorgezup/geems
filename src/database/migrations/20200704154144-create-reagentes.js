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
          type: Sequelize.ENUM,
          values: ['sólido', 'líquido'],
          allowNull: false,
        },
        quantidade : {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        local_armazenamento_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'locais', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        incompatibilidade : {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        controlado : {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        orgao_controle_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          // references: { model: 'orgaos', key: 'id' },
          // onUpdate: 'CASCADE',
          // onDelete: 'CASCADE',
        },
        created_by_user_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: { model: 'users', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
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
