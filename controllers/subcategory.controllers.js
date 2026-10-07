const { model } = require("mongoose")
const Subcategory = require("../models/subcategory.models.js")
const deletePic = require("../helper/file-delete.helper.js")

// controllers ke ander ham model ko import krke database model me crud operations ke functionality likhte hai

async function createRecord(req, res) {
    // console.log(req.body)
    // res.send("post method called")

    try {
        let data = new Subcategory(req.body)  // ham yaha req.body se jo data aaega ussey model ke object me pass kr dege aur eak nya record create krege apne model database me
        if (req.file) {
            data.pic = req.file.path
        }
        await data.save() // ab data create hone ke bad hame data ko save bhi krna padta hai tabhi wo mongodb atlas me record show hoga
        res.send({
            result: "Done",
            data: data
        })

    } catch (error) {

        if (req.file) {
            deletePic(req.file.path)
        }




        let errorMessage = {}
        if (error.keyValue) {  // keyvalue error --> dupliacte field ke liye hota hai mtlb same nam ka dobara filed wala error hota hai
            errorMessage["name"] = "Subcategory with this name is already exists"

        }
        else {
            errorMessage = Object.fromEntries(Object.keys(error?.errors).map(key => [key, error?.errors[key]?.message]))
        }
        res.status(Object.values(errorMessage).length === 0 ? 500 : 400).send({
            result: "Fail",
            reason: Object.values(errorMessage).length === 0 ? "Internal server error" : errorMessage
        })

    }

}

async function getRecord(req, res) {
    try {
        let data = await Subcategory.find().sort({ _id: -1 })
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
        let data = await Subcategory.findOne({ _id: req.params._id })
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
        let data = await Subcategory.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name ?? data.name
            data.status = req.body.status ?? data.status
            await data.save()

            if (req.file) {
                deletePic(data.pic)  // yaha hamne apne model ke pic field ko delete kiya hai purana wala pic field ka image
                data.pic = req.file.path  // yaha hamne nya wala image ka path apne model ke pic field me add kiya hai

                await data.save()

            }
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
        if (error.keyValue) {  // keyValue error --> dupliacte field ke liye hota hai mtlb same nam ka dobara filed wala error hota hai
            errorMessage["name"] = "Subcategory with this name is already exists"

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
        let data = await Subcategory.findOne({ _id: req.params._id })
        if (data) {
            deletePic(data.pic)
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

