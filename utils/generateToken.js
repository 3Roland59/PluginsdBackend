
const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET

 function generateCode(length = 6) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return code;
}

 const generateToken = (username, email,_id) =>{
  const token = jwt.sign({ user: {
    username,
    email,
    _id
  } }, ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  return token
}

module.exports = { generateToken, generateCode}
