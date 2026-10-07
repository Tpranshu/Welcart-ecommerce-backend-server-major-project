const { model } = require("mongoose")
const Product = require("../models/product.models.js")
const deletePic = require("../helper/file-delete.helper.js")

// controllers ke ander ham model ko import krke database model me crud operations ke functionality likhte hai

async function createRecord(req, res) {
    // console.log(req.body)
    // res.send("post method called")

    try {
        let data = new Product(req.body)  // ham yaha req.body se jo data aaega ussey model ke object me pass kr dege aur eak nya record create krege apne model database me
        if (req.files) {
            data.pic = Array.from(req.files).map(x => x.path)
        }
        await data.save() // ab data create hone ke bad hame data ko save bhi krna padta hai tabhi wo mongodb atlas me record show hoga

        let finalData = await Product.findOne({ _id: data._id }).populate("maincategory", ["name"]).populate("subcategory", ["name"]).populate("brand", ["name"])

        res.send({
            result: "Done",
            data: finalData
        })

    } catch (error) {

        if (req.file) {
            // deletePic(req.file.path)
            Array.from(req.files).forEach(x => deletePic(x.path))

        }




        let errorMessage = Object.fromEntries(Object.keys(error?.errors).map(key => [key, error?.errors[key]?.message]))

        res.status(Object.values(errorMessage).length === 0 ? 500 : 400).send({
            result: "Fail",
            reason: Object.values(errorMessage).length === 0 ? "Internal server error" : errorMessage
        })

    }

}

async function getRecord(req, res) {
    try {
        let data = await Product.find().sort({ _id: -1 }).populate("maincategory", ["name"]).populate("subcategory", ["name"]).populate("brand", ["name"])
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
        let data = await Product.findOne({ _id: req.params._id }).populate("maincategory", ["name"]).populate("subcategory", ["name"]).populate("brand", ["name"])
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

        if ((req.files?.length === 0 && (!req.body.oldPics || req.body.oldPics?.length === 0))) {

            req.status(400).send({
                result: "Fail",
                reason: {
                    pic: "Please select atleast one pic"
                }
            })
            return

        }

        let data = await Product.findOne({ _id: req.params._id })

        if (data) {
            data.name = req.body.name ?? data.name
            data.maincategory = req.body.maincategory ?? data.maincategory
            data.subcategory = req.body.subcategory ?? data.subcategory
            data.brand = req.body.brand ?? data.brand
            data.color = req.body.color ?? data.color
            data.size = req.body.size ?? data.size
            data.stock = req.body.stock ?? data.stock
            data.stockQuantity = req.body.stockQuantity ?? data.stockQuantity
            data.description = req.body.description ?? data.description
            data.basePrice = req.body.basePrice ?? data.basePrice
            data.discount = req.body.discount ?? data.discount
            data.finalPrice = req.body.finalPrice ?? data.finalPrice
            data.status = req.body.status ?? data.status

            await data.save()

            if ((!req.body.oldPics || req.body.oldPics.length === 0)) {
                let pics = [...data.pic]
                pics?.forEach(x => {
                    deletePic(x)
                })
                data.pic = []

            }

            if ((req.body.oldPics || req.body.oldPics.length)) {
                let pics = [...data.pic]
                pics?.forEach(x => {
                    if (!req.body.oldPics?.includes(x)) {

                        deletePic(x)
                    }
                })
                data.pic = req.body.oldPics

            }

            if (req.files) {
                // deletePic(data.pic)  // yaha hamne apne model ke pic field ko delete kiya hai purana wala pic field ka image
                // data.pic = req.file.path  // yaha hamne nya wala image ka path apne model ke pic field me add kiya hai

                data.pic = data.pic.concat(Array.from(req.files).map(x => x.path))


            }
            await data.save()
            res.send({
                result: "Done",
                data: data
            })


            let finalData = await Product.findOne({ _id: data._id }).populate("maincategory", ["name"]).populate("subcategory", ["name"]).populate("brand", ["name"])

            res.send({
                result: "Done",
                data: finalData
            })
            

        } else {
            res.status(404).send({
                result: "Fail",
                reason: "No such record found"

            })

        }

    } catch (error) {
        if (req.file) {
            deletePic(req.file.path)
        }

        let errorMessage = Object.fromEntries(Object.keys(error?.errors).map(key => [key, error?.errors[key]?.message]))

        res.status(Object.values(errorMessage).length === 0 ? 500 : 400).send({
            result: "Fail",
            reason: Object.values(errorMessage).length === 0 ? "Internal server error" : errorMessage
        })

    }
    // res.send("put single method called")

}

async function deleteRecord(req, res) {
    try {
        let data = await Product.findOne({ _id: req.params._id })
        if (data) {
            // deletePic(data.pic)
            data.pic?.forEach(x => {
                deletePic(x)
            })

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

