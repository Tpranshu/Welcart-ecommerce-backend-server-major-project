const express = require("express")
const { createRecord, getRecord, getSingleRecord, updateRecord, deleteRecord } = require("../controllers/feature.controllers.js")

const FeatureRouter = express.Router()

// routes ke ander ham controller ko import krte hai and jab koi is route pe aae to ussey particualr is controller pe bhej do

FeatureRouter.post("", createRecord)
FeatureRouter.get("", getRecord)
FeatureRouter.get("/:_id", getSingleRecord)
FeatureRouter.put("/:_id", updateRecord)
FeatureRouter.delete("/:_id", deleteRecord)



module.exports = FeatureRouter



