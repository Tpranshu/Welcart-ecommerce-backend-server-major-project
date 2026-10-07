const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product Name is Mendatory"]

    },
    maincategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Maincategory",
        required: [true, "product maincategory is Mendatory"]

    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory",
        required: [true, "product subcategory is Mendatory"]

    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
        required: [true, "product brand is Mendatory"]

    },
    color: {
        type: [String],
        required: [true, "Product color is mendatory"],
        validate: {
            validator: function (v) {
                return v && v.length > 0;
            },
            message: "please provide atleast one product color"
        }

    },
    size: {
        type: [String],
        required: [true, "Product size is mendatory"],
        validate: {
            validator: function (v) {
                return v && v.length > 0;
            },
            message: "please provide atleast one product size"
        }

    },
    pic: {
        type: [String],
        required: [true, "Product pic is mendatory"],
        validate: {
            validator: function (v) {
                return v && v.length > 0;
            },
            message: "please provide atleast one product pic"
        }

    },
    basePrice: {
        type: Number,
        required: [true, "Product base Price is Mendatory"]

    },
    discount: {
        type: Number,
        required: [true, "Product discount is Mendatory"]

    },
    finalPrice: {
        type: Number,
        required: [true, "Product final price is Mendatory"]

    },
    stock: {
        type: Boolean,
        default: true

    },
    stockQuantity: {
        type: Number,
        required: [true, "Product stock quantity is Mendatory"]

    },
    description: {
        type: Number,
        default: ""

    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

const Product = mongoose.model("Product", ProductSchema)
module.exports = Product
