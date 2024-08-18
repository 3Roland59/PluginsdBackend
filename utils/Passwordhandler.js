const bcrypt = require("bcrypt");

const saltRounds = 10;

const hashPassword = async (pass) => {
  let myHash = await bcrypt.hash(pass, saltRounds)
  return myHash;
};

const checkPassword = async(password1, password2) =>{
  const passwordMatch = await bcrypt.compare(password1, password2);
  return passwordMatch
}

module.exports = { hashPassword, checkPassword };
