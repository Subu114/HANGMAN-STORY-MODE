const express = require("express")
const router = express.Router()

const authenticateJWT = require("../middlewares/jwtAuthentication")
const sceneController = require("../controllers/sceneController.js")


router.get("/", authenticateJWT, sceneController.getAllScenes)

router.get("/:sceneNumber", authenticateJWT, sceneController.getScene)

router.get("/word/:sceneNumber", authenticateJWT, sceneController.getSceneWord)

router.post("/create", authenticateJWT, sceneController.putScene)
router.post("/update", authenticateJWT, sceneController.updateScene)

router.delete("/delete/:sceneNumber", authenticateJWT, sceneController.deleteScene)

module.exports = router