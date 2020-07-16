const { hash, genSalt } = require("bcrypt");

async function genPass(password) {
  // const salt = await genSalt(10);
  // const passwprdHash = await hash(password, salt);  
  const newPassword = await hash(password, 8)

  return newPassword;
  // return passwprdHash;
}




module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('users', 
    [
      {
        nome: 'Jorge',
        email: 'jorgebertolo@gmail.com',
        password: await genPass('jorge'),
        passaporte: 'jorge.zupirolli',
        papel_id: 2,
        is_admin: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('users', null, {}),
};