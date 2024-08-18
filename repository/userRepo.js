const User = require("../models/userModel");
const Verified = require("../models/verifiedModel");

 const createUser = async(username, password, email, phone) =>{
    const user = await User.create({
        username,
        email,
        password,
        phone,
        verified: false,
      });
      return user
}

 const createVerified = async(email, code) =>{
    const verified = await Verified.create({ email, code });
    return verified
}

 const getVerified = async (email)=>{
    const user = await Verified.findOne({email});
    return user;
}

 const deleteUser = async(_id) =>{
    const user = await User.deleteOne({_id});
    return user
}

 const getUser = async (email)=>{
    const user = await User.findOne({email});
    return user;
}

 const getUsers = async ()=>{
    const users = await User.find();
    return users;
}

 const updateUserVerfied = async(email) =>{
    const updatedUser = await User.findOneAndUpdate(
        { email },
        { verified: true },
        { new: true }
      );
    return updatedUser
}

 const updateVerifiedCode = async(email, code) =>{
    const updatedCode = await Verified.findOneAndUpdate(
        { email },
        { code },
        { new: true }
      );
    return updatedCode
}

module.exports = {createUser, createVerified, deleteUser,getUser,getUsers,getVerified,updateUserVerfied,updateVerifiedCode}