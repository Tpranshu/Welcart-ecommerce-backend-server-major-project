const express = require("express")
const { createRecord, getRecord, getSingleRecord, updateRecord, deleteRecord } = require("../controllers/contactus.controllers.js")

const ContactUsRouter = express.Router()


ContactUsRouter.post("", createRecord)
ContactUsRouter.get("", getRecord)
ContactUsRouter.get("/:_id", getSingleRecord)
ContactUsRouter.put("/:_id", updateRecord)
ContactUsRouter.delete("/:_id", deleteRecord)



module.exports = ContactUsRouter



