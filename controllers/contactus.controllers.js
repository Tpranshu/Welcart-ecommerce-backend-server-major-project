
const ContactUs = require("../models/contactus.models.js")


async function createRecord(req, res) {
    // console.log(req.body)
    // res.send("post method called")

    try {
        let data = new ContactUs(req.body)

        await data.save()
        res.send({
            result: "Done",
            data: data
        })

    } catch (error) {


        let errorMessage = {}


        errorMessage = Object.fromEntries(Object.keys(error?.errors).map(key => [key, error?.errors[key]?.message]))

        res.status(Object.values(errorMessage).length === 0 ? 500 : 400).send({
            result: "Fail",
            reason: Object.values(errorMessage).length === 0 ? "Internal server error" : errorMessage
        })

    }

}

async function getRecord(req, res) {
    try {
        let data = await ContactUs.find().sort({ _id: -1 })
        res.send({
            result: "Done",
            count: data.length,
            data: data
        })
    } catch (error) {
        res.status(500).send({
            result: "Fail",
            reason: "internal server error"

        })


    }

}

async function getSingleRecord(req, res) {
    try {
        let data = await ContactUs.findOne({ _id: req.params._id })
        if (data) {
            res.send({
                result: "Done",
                data: data
            })

        } else {
            res.status(404).send({
                result: "Fail",
                reason: "No such record found"

            })

        }

    } catch (error) {
        res.status(500).send({
            result: "Fail",
            reason: "internal server error"

        })
    }

}

async function updateRecord(req, res) {
    try {
        let data = await ContactUs.findOne({ _id: req.params._id })
        if (data) {
            data.status = req.body.status ?? data.status
            await data.save()


            res.send({
                result: "Done",
                data: data
            })

        } else {
            res.status(404).send({
                result: "Fail",
                reason: "No such record found"

            })

        }

    } catch (error) {
         res.status(500).send({
            result: "Fail",
            reason: "internal server error"

        })

    }

}

async function deleteRecord(req, res) {
    try {
        let data = await ContactUs.findOne({ _id: req.params._id })
        if (data) {
            await data.deleteOne()

            res.send({
                result: "Done",
            })

        } else {
            res.status(404).send({
                result: "Fail",
                reason: "No such record found"

            })

        }

    } catch (error) {
        res.status(500).send({
            result: "Fail",
            reason: "internal server error"

        })
    }

}



module.exports = {
    createRecord: createRecord,
    getRecord: getRecord,
    getSingleRecord: getSingleRecord,
    updateRecord: updateRecord,
    deleteRecord: deleteRecord,
}

