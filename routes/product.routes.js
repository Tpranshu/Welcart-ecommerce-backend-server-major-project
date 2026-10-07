const express = require("express")
const { createRecord, getRecord, getSingleRecord, updateRecord, deleteRecord } = require("../controllers/product.controllers.js")
const { productUploader } = require("../middleware/file-uploader.middleware.js")

const ProductRouter = express.Router()

// routes ke ander ham controller ko import krte hai and jab koi is route pe aae to ussey particualr is controller pe bhej do

ProductRouter.post("", productUploader.array("pic"), createRecord)  // yaha hame beech me multer middleware lgaya hai jo hamre image ko locally folder me image upload krega and image upload krne ka bad multer middleware hame uska path return krega aur path ko ham apne model ke pic field me de dege
ProductRouter.get("", getRecord)
ProductRouter.get("/:_id", getSingleRecord)
ProductRouter.put("/:_id", productUploader.array("pic"), updateRecord)
ProductRouter.delete("/:_id", deleteRecord)



module.exports = ProductRouter



