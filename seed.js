const { hash, genSalt } = require("bcrypt");

async function genPass(password) {
  const salt = await genSalt(10);
  const passwprdHash = await hash(password, salt);  

  return passwprdHash;
}
const pass = setTimeout(() => genPass('jorge'), 1000) 
console.log(genPass('secrete'))