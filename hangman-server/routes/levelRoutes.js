const express = require("express")
const router = express.Router()

const authenticateJWT = require("../middlewares/jwtAuthentication")
const levelController = require("../controllers/levelController.js")


router.get("/", levelController.getAllLevels)

router.get("/:levelNumber", levelController.getLevel)

router.post("/create", authenticateJWT, levelController.putLevel)

router.post("/update", authenticateJWT, levelController.updateLevel)

router.delete("/delete/:levelNumber", authenticateJWT, levelController.deleteScene)

module.exports = router