const express = require("express")
const router = express.Router()

const authenticateJWT = require("../middlewares/jwtAuthentication")
const sceneController = require("../controllers/sceneController.js")


router.get("/", authenticateJWT, sceneController.getAllScenes)

router.get("/:sceneNumber/:level", authenticateJWT, sceneController.getScene)

router.post("/word/:sceneNumber/:level", authenticateJWT, sceneController.getSceneWord)

router.post("/create", authenticateJWT, sceneController.putScene)
router.post("/update", authenticateJWT, sceneController.updateScene)

router.delete("/delete/:sceneNumber", authenticateJWT, sceneController.deleteScene)

module.exports = router