const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema({

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product id is Mendatory"]

    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User id is Mendatory"]

    },
    quantity: {
        type: Number,
        required: [true, "Quantity field is Mendatory"]

    },
    color: {
        type: Number,
        required: [true, "Product Color is Mendatory"]

    },
    size: {
        type: Number,
        required: [true, "Product Size Field is Mendatory"]

    },
    total: {
        type: Number,
        default: true,
        required: [true, "Total Field is Mendatory"]

    }
}, {
    timestamps: true
})

const Cart = mongoose.model("Cart", CartSchema)
module.exports = Cart
