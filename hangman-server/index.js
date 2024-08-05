const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const morgan = require("morgan")

require("dotenv").config()


const app = express();
const port = process.env.PORT || 8000;

//MIDDLEWARES
app.use(cors())
app.use(morgan("tiny"))
app.use(express.json())
app.use(express.urlencoded({extended : true}))


app.use("/api/v1", require("./routes/index"))

mongoose.connect(process.env.DB_URL).then(() => {
    
    console.log("Successfully connected to the MongoDB")
    app.listen(port, () => {
        console.log(`Server listening on port${port}`)
    })
}).catch((err) => {
    console.log(`Error while connection to DB : ${err}`)
})

