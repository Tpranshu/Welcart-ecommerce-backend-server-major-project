
const Setting = require("../models/setting.models.js")


async function createRecord(req, res) {
    // console.log(req.body)
    // res.send("post method called")
    
    try {
        let data = await Setting.find()

        if (data.length === 0) {

            let data = new Setting(req.body)
            await data.save()
            res.send({
                result: "Done",
                data: data
            })

        } else {
            res.send({
                result: "Done",
                data: data
            })
        }

    } catch (error) {

        res.status(500).send({
            result: "Fail",
            reason: "internal server error"

        })

    }

}

async function getRecord(req, res) {
    try {
        let data = await Setting.find().sort({ _id: -1 })
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
    // res.send("Get method called")

}

async function getSingleRecord(req, res) {
    try {
        let data = await Setting.findOne({ _id: req.params._id })
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
    // res.send("Get single method called")

}

async function updateRecord(req, res) {
    try {
        let data = await Setting.findOne({ _id: req.params._id })
        if (data) {
            data.siteName = req.body.siteName ?? data.siteName
            data.map1 = req.body.map1 ?? data.map1
            data.address = req.body.address ?? data.address
            data.email = req.body.email ?? data.email
            data.phone = req.body.phone ?? data.phone
            data.whatsapp = req.body.whatsapp ?? data.whatsapp
            data.facebook = req.body.facebook ?? data.facebook
            data.twitter = req.body.twitter ?? data.twitter
            data.instagram = req.body.instagram ?? data.instagram
            data.linkedin = req.body.linkedin ?? data.linkedin
            data.youtube = req.body.youtube ?? data.youtube
            data.privacyPolicy = req.body.privacyPolicy ?? data.privacyPolicy
            data.termsAndConditions = req.body.termsAndConditions ?? data.termsAndConditions
            data.refundPolicy = req.body.refundPolicy ?? data.refundPolicy

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
        let errorMessage = {}
        if (error.keyValue) {
            errorMessage["question"] = "Setting with this Question is already exists"

        }
        else {
            errorMessage = Object.fromEntries(Object.keys(error?.errors).map(key => [key, error?.errors[key]?.message]))
        }
        res.status(Object.values(errorMessage).length === 0 ? 500 : 400).send({
            result: "Fail",
            reason: Object.values(errorMessage).length === 0 ? "Internal server error" : errorMessage
        })

    }
    // res.send("put single method called")

}

async function deleteRecord(req, res) {
    try {
        let data = await Setting.findOne({ _id: req.params._id })
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
    // res.send("delete single method called")

}



module.exports = {
    createRecord: createRecord,
    getRecord: getRecord,
    getSingleRecord: getSingleRecord,
    updateRecord: updateRecord,
    deleteRecord: deleteRecord,
}

