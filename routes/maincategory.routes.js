const express = require("express")
const { createRecord, getRecord, getSingleRecord, updateRecord, deleteRecord } = require("../controllers/maincategory.controllers.js")
const {maincategoryUploader} = require("../middleware/file-uploader.middleware.js")

const MaincategoryRouter = express.Router()

// routes ke ander ham controller ko import krte hai and jab koi is route pe aae to ussey particualr is controller pe bhej do

MaincategoryRouter.post("",maincategoryUploader.single("pic"), createRecord)  // yaha hame beech me multer middleware lgaya hai jo hamre image ko locally folder me image upload krega and image upload krne ka bad multer middleware hame uska path return krega aur path ko ham apne model ke pic field me de dege
MaincategoryRouter.get("", getRecord)
MaincategoryRouter.get("/:_id", getSingleRecord)
MaincategoryRouter.put("/:_id",maincategoryUploader.single("pic"), updateRecord)
MaincategoryRouter.delete("/:_id", deleteRecord)



module.exports = MaincategoryRouter



