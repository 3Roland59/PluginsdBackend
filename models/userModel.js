const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add a username"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please add an email"],
    },
    phone: {
        type: String,
        required: [true, "Please add a phone number"],
    },
    password: {
        type: String,
        required: [true, "Password required"],
        min: [6, 'Password too small']
    },
    verified:{
        type: Boolean
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)