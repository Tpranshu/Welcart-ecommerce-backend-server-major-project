const express = require("express")
require("dotenv").config()

require("./utils/db-connect.js")
const router = require("./routes/index.routes.js")

const app = express()
app.use(express.json()) // ye json data ko javascript object me convert krke deta hai

const PORT = process.env.PORT || 8000

app.use("/api", router)

app.listen(PORT, ()=>{
    console.log("server is running at the port of 8000")
})

