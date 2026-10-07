const express = require("express")
const { createRecord, getRecord, getSingleRecord, updateRecord, deleteRecord, login } = require("../controllers/user.controllers.js")

const UserRouter = express.Router()

// routes ke ander ham controller ko import krte hai and jab koi is route pe aae to ussey particular is controller pe bhej do

UserRouter.post("", createRecord)
UserRouter.get("", getRecord)
UserRouter.get("/:_id", getSingleRecord)
UserRouter.put("/:_id", updateRecord)
UserRouter.delete("/:_id", deleteRecord)
UserRouter.post("/:_id", login)



module.exports = UserRouter



