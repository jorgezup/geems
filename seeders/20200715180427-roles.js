module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('roles', 
    [
      {
        nome: 'Aluno',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: 'Professor',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome: 'Técnico',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('roles', null, {}),
};