const express = require("express")
const { createRecord, getRecord, getSingleRecord, updateRecord, deleteRecord } = require("../controllers/newsletter.controllers.js")

const NewsletterRouter = express.Router()


NewsletterRouter.post("", createRecord)
NewsletterRouter.get("", getRecord)
NewsletterRouter.get("/:_id", getSingleRecord)
NewsletterRouter.put("/:_id", updateRecord)
NewsletterRouter.delete("/:_id", deleteRecord)



module.exports = NewsletterRouter



