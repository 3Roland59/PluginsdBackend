
const { hashPassword, checkPassword } = require("../utils/Passwordhandler");
const {sendTokenEmail} = require("../utils/emailHandler");
const {generateToken, generateCode} = require('../utils/generateToken');
const { createVerified, createUser, deleteUser, getUser, getVerified, updateVerifiedCode, updateUserVerfied } = require("../repository/userRepo");

const signUp = async (req, res) => {
    try {
      console.log("The request body is:", req.body);
      const { username, password, email, phone } = req.body;
      if(!username || !email || !password || !phone){
        return res.status(400).json({error: "All fields are required!"})
      }
      const exists = await getUser(email)
      if (exists) {
        console.log(exists)
        return res.status(400).json({error: "User with such email already exists!"})
      }
      const hash = await hashPassword(String(password));
      const user = await createUser(username, hash, email, phone)
  
      if (!user) {
        return res.status(400).json({error: 'User data not valid!'})
      }
      const code = generateCode()
      sendTokenEmail(email, code);
  
      const verified = await createVerified(email, code);
      // console.log(verified)
      res.status(201).json({ message: "Registration successful"});
    } catch (error) {
      console.error("Error during registration:", error.message);
      res.status(500).json({error: error.message})
    }
  };
  

const deleteAccount = async (req, res) => {
  try{
  console.log("The request body is:", req.body);
  const { _id } = req.user;
  const user = await deleteUser(_id)
  if (!user) {
    return res.status(400).json({error: "User not found!"})
  }
  res.status(200).json({_id: user._id, email: user.email});
  }catch(error){
    res.status(500).json({error: error.message})
  }
};

const login = async (req, res) => {
  try {
    console.log("The request body is:", req.body);
    const { email, password } = req.body;
    if(!email || !password){
      return res.status(400).json({error: "All fields are required!"})
    }
    const user = await getUser(email);
    if (!user) {
      return res.status(404).json({error: 'Invalid email!'})
    }
    const passwordMatch = await checkPassword(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({error:"Authentication failed"})
    }
    if (!user.verified) {
      return res.status(401).json({erorr:"User not verified"})
    }
    const accesstoken = generateToken(user.username, user.email,user._id)
    res.status(200).json({ username: user.username, email: user.email, phone: user.phone, _id: user._id, accesstoken });
  } catch (error) {
    res.status(500).json({error: error.message})
  }
};

const fetchUser = async (req, res) => {
  const { email } = req.user;
  try {
    const user = await getUser(email);
    res.status(200).json({username: user.username, email: user.email, phone: user.phone, _id: user._id});
  } catch (error) {
    res.status(500).json({error: error.message})
  }
};

const verifyEmail = async (req, res) => {
  const { email, code } = req.body;
  const verified = await getVerified(email);
  try {
    if(!verified){
        return res.status(404).json({error: "Verification document not found!"})
    }
    if (verified&&!(verified.code == String(code))) {
        return res.status(401).json({error: "Verification failed!"})
    } else if(verified&&(verified.code == String(code))){
      const updatedUser = await updateUserVerfied(email)
      console.log("Updated User:",updatedUser);
      return res.status(200).json({ message: "Verification successfull" });
    }
  } catch (error) {
    res.status(500).json({error: error.message})
  }
};

const resendEmailToken = async (req, res) => {
    const { email } = req.body
    const code = generateCode()
    try {
      const updatedCode = await updateVerifiedCode(email,code)
      if (!updatedCode) {
        return res.status(401).json({error:"Invalid email!" })
      }
      sendTokenEmail(email,code );
      console.log('document ', updatedCode);
      res.status(200).json({message:"Resend successful"});
    } catch (error) {
      res.status(500).json({error: error.message})
    }
}

module.exports = { signUp, deleteAccount, fetchUser, login, verifyEmail, resendEmailToken };
