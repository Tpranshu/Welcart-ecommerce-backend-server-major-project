const express = require("express")
const { createRecord, getRecord, getSingleRecord, updateRecord, deleteRecord } = require("../controllers/cart.controllers.js")

const CratRouter = express.Router()

// routes ke ander ham controller ko import krte hai and jab koi is route pe aae to ussey particualr is controller pe bhej do

CratRouter.post("", createRecord)
CratRouter.get("", getRecord)
CratRouter.get("/:_id", getSingleRecord)
CratRouter.put("/:_id", updateRecord)
CratRouter.delete("/:_id", deleteRecord)



module.exports = CratRouter



