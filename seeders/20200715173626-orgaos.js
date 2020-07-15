module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('orgaos', 
    [
      {
        nome: 'Exército',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: 'Polícia Federal',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('orgaos', null, {}),
};