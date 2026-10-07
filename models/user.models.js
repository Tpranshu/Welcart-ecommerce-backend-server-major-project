const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User Name is Mendatory"]

    },
    username: {
        type: String,
        unique: true,
        required: [true, "User username is Mendatory"]

    },
    email: {
        type: String,
        unique: true,
        required: [true, "User email is Mendatory"]

    },
    phone: {
        type: String,
        required: [true, "User phone number is Mendatory"]

    },
    password: {
        type: String,
        required: [true, "User password is Mendatory"]

    },
    role: {
        type: String,
        default: "Buyer",

    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

const User = mongoose.model("User", UserSchema)
module.exports = User
