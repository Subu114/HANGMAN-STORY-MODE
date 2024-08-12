const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateJWT = require('../middlewares/jwtAuthentication');


//Read all users
router.get('/', authenticateJWT, userController.getAllUsers);

//Create a user
router.post('/register', userController.createUser);

//Log in
router.post("/login", userController.loginUser)

//Update
router.post("/update", authenticateJWT, userController.addPhoto)

//Read a single user by ID
router.get('/get/:id', authenticateJWT, userController.getUserById);


//Delete a user by ID
router.delete('/delete', authenticateJWT, userController.deleteUser);


router.get("/check-username", userController.checkUsername)

router.post("/game-state/create", authenticateJWT, userController.setGameState)
router.get("/game-state", authenticateJWT, userController.getGameState)
router.delete("/game-state/delete", authenticateJWT, userController.deleteGameState)

router.post("/auth", authenticateJWT, userController.isAuth)


module.exports = router;