const express = require("express")
const router = express.Router()

//ROUTES
const userRoutes = require("./userRoutes")
const sceneRoutes = require("./sceneRoutes")
const levelRoutes = require("./levelRoutes")

router.use("/users", userRoutes)
router.use("/scenes", sceneRoutes)
router.use("/levels", levelRoutes)


module.exports = router