const express = require("express")
const { createRecord, getRecord, getSingleRecord, updateRecord, deleteRecord } = require("../controllers/faq.controllers.js")

const FaqRouter = express.Router()


FaqRouter.post("", createRecord)
FaqRouter.get("", getRecord)
FaqRouter.get("/:_id", getSingleRecord)
FaqRouter.put("/:_id", updateRecord)
FaqRouter.delete("/:_id", deleteRecord)



module.exports = FaqRouter



