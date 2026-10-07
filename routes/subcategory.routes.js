const express = require("express")
const { createRecord, getRecord, getSingleRecord, updateRecord, deleteRecord } = require("../controllers/subcategory.controllers.js")
const {subcategoryUploader} = require("../middleware/file-uploader.middleware.js")

const SubcategoryRouter = express.Router()

// routes ke ander ham controller ko import krte hai and jab koi is route pe aae to ussey particualr is controller pe bhej do

SubcategoryRouter.post("",subcategoryUploader.single("pic"), createRecord)  // yaha hame beech me multer middleware lgaya hai jo hamre image ko locally folder me image upload krega and image upload krne ka bad multer middleware hame uska path return krega aur path ko ham apne model ke pic field me de dege
SubcategoryRouter.get("", getRecord)
SubcategoryRouter.get("/:_id", getSingleRecord)
SubcategoryRouter.put("/:_id",subcategoryUploader.single("pic"), updateRecord)
SubcategoryRouter.delete("/:_id", deleteRecord)



module.exports = SubcategoryRouter



