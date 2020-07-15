module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('locais', 
    [
      {
        nome: 'Armário 01',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: 'Armário 02',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Sala do Professor',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('locais', null, {}),
};