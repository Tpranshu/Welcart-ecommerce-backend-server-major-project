const mongoose = require("mongoose")

const FaqSchema = new mongoose.Schema({
    question: {
        type: String,
        unique: true,
        required: [true, "Faq question is Mendatory"]

    },
    answer: {
        type: String,
        required: [true, "Faq answer is Mendatory"]
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

const Faq = mongoose.model("Faq", FaqSchema)
module.exports = Faq
