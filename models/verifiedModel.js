const mongoose = require("mongoose");

const verifiedSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    code: {
        type: String,
        required: true,
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Verified', verifiedSchema)