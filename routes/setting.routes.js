const express = require("express")
const { createRecord, getRecord, getSingleRecord, updateRecord, deleteRecord } = require("../controllers/setting.controllers.js")

const SettingRouter = express.Router()


SettingRouter.post("", createRecord)
SettingRouter.get("", getRecord)
SettingRouter.get("/:_id", getSingleRecord)
SettingRouter.put("/:_id", updateRecord)
SettingRouter.delete("/:_id", deleteRecord)



module.exports = SettingRouter



