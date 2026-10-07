const mongoose = require("mongoose")

const ContactUsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name field is Mendatory"]

    },
    email: {
        type: String,
        required: [true, "email address field is Mendatory"]

    },
    phone: {
        type: String,
        unique: true,
        required: [true, "phone number field is Mendatory"]

    },
    subject: {
        type: String,
        unique: true,
        required: [true, "subject field is Mendatory"]

    },
    message: {
        type: String,
        unique: true,
        required: [true, "message field is Mendatory"]

    },
    
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

const ContactUs = mongoose.model("ContactUs", ContactUsSchema)
module.exports = ContactUs
