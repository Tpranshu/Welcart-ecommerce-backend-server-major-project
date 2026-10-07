
const User = require("../models/user.models.js")
const passwordValidator = require("password-validator");

const bcrypt = require("bcrypt")

const schema = new passwordValidator();


schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase(1)                              // Must have uppercase letters
    .has().lowercase(1)                              // Must have lowercase letters
    .has().digits(1)                                // Must have at least 2 digits
    .has().symbols(1)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values





// controllers ke ander ham model ko import krke database model me crud operations ke functionality likhte hai

async function createRecord(req, res) {
    // ab password ko hash krke model me save krne and sath me password pe validation ka logic bhi likhege
    if (schema.validate(req.body.password)) {  // ye schema.validate() function apne aap check kr dega jo password request se aaega wo validate check kr dega
        // password validation check hone ke bad ham password ko hash kr dege
        bcrypt.hash(req.body.password, 12, async (error, hash) => {
            if (error) {
                res.send({
                    result: "Fail",
                    reason: "Internal server error"
                })

            } else {

                try {
                    let data = new User(req.body)  // ham yaha req.body se jo data aaega ussey model ke object me pass kr dege aur eak nya record create krege apne model database me
                    data.password = hash
                    data.role = "Buyer"

                    await data.save() // ab data create hone ke bad hame data ko save bhi krna padta hai tabhi wo mongodb atlas me record show hoga
                    res.send({
                        result: "Done",
                        data: data
                    })

                } catch (error) {


                    let errorMessage = {}
                    if (error.keyValue) {  // keyvalue error --> dupliacte field ke liye hota hai mtlb same nam ka dobara filed wala error hota hai
                        if (error.keyValue['username']) {
                            errorMessage["username"] = "User with this Username is already exists"
                        } else {
                            errorMessage["email"] = "User with this Email Address is already exists"

                        }

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

        })




    } else {
        res.send({
            result: "Fail",
            reason: {
                // password: schema.validate(req.body.password, { deatils: true }).map(x => x.message?.replaceAll("string", "Password")).join(", ")
                password: schema.validate(req.body.password, { details: true })
            }
        })

    }



    // console.log(req.body)
    // res.send("post method called")


}

async function getRecord(req, res) {
    try {
        let data = await User.find().sort({ _id: -1 })
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
        let data = await User.findOne({ _id: req.params._id })
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
        let data = await User.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name ?? data.name
            data.username = req.body.username ?? data.username
            data.email = req.body.email ?? data.email
            data.role = req.body.role ?? data.role
            data.phone = req.body.phone ?? data.phone
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
        let errorMessage = {}
        
        if (error.keyValue) {
            if (error.keyValue['username']) {
                errorMessage["username"] = "User with this Username is already exists"
            } else {
                errorMessage["email"] = "User with this Email Address is already exists"

            }
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
        let data = await User.findOne({ _id: req.params._id })
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


async function login(req, res) {
    try {
        let data = await User.findOne({ 
            $or: [
                {username: req.body.username},
                {email: req.body.email}
            ]
         })
        if (data && await bcrypt.compare(req.body.password, data.password)) {
            res.send({
                result: "Done",
                data: data
            })

        } else {
            res.status(404).send({
                result: "Fail",
                reason: "username or password is invalid"

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


module.exports = {
    createRecord: createRecord,
    getRecord: getRecord,
    getSingleRecord: getSingleRecord,
    updateRecord: updateRecord,
    deleteRecord: deleteRecord,
    login: login
}

