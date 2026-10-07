const express = require("express")
const { createRecord, getRecord, getSingleRecord, updateRecord, deleteRecord } = require("../controllers/brand.controllers.js")
const { brandUploader } = require("../middleware/file-uploader.middleware.js")

const BrandRouter = express.Router()

// routes ke ander ham controller ko import krte hai and jab koi is route pe aae to ussey particualr is controller pe bhej do

BrandRouter.post("", brandUploader.single("pic"), createRecord)  // yaha hame beech me multer middleware lgaya hai jo hamre image ko locally folder me image upload krega and image upload krne ka bad multer middleware hame uska path return krega aur path ko ham apne model ke pic field me de dege
BrandRouter.get("", getRecord)
BrandRouter.get("/:_id", getSingleRecord)
BrandRouter.put("/:_id", brandUploader.single("pic"), updateRecord)
BrandRouter.delete("/:_id", deleteRecord)



module.exports = BrandRouter



