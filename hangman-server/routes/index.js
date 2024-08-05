const express = require("express")
const router = express.Router()

//ROUTES
const userRoutes = require("./userRoutes")
const sceneRoutes = require("./sceneRoutes")

router.use("/users", userRoutes)
router.use("/scenes", sceneRoutes)


module.exports = router