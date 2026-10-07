const mongoose = require("mongoose")

const NewsletterSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Newsletter email is Mendatory"]

    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

const Newsletter = mongoose.model("Newsletter", NewsletterSchema)
module.exports = Newsletter
