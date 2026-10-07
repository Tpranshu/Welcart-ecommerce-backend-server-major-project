const { default: mongoose } = require("mongoose");

require("mongoose")
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("database is connected")
    })
    .catch(error => console.log(error))





// mongoose promise function hota hai to isme ham .then() and .catch() lga skte hai
