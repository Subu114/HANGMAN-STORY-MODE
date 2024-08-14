const { generateToken } = require("../authenticate/jwtUtil");
const bcrypt = require('bcrypt');

const User = require("../models/user");
const UserGameState = require("../models/userGameState");
const Scene = require("../models/scene");
const { isAdmin } = require("../authenticate/isAdmin");



exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid Email or password" });
        }

        const token = generateToken(user._id);
        {
            const { username, email, role, photo, _id, scene, chapter, achievements} = user
            return res.status(200).json({ token, user: { _id, username, email, role, photo, scene, chapter, achievements } });
        }
    } catch (error) {
        console.log("Error while logging in : ", error);
        res.status(500).json({ message: "Could not log in! Please try again later..." });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { username, email, password, photo } = req.body;
        const existUser = await User.findOne({ username, email })
        const userPhoto = photo || "https://th.bing.com/th/id/OIG3.UrwSVrCs0Z7hqIAC6RtR?w=1024&h=1024&rs=1&pid=ImgDetMain";


        if (existUser) {
            console.log("User already exist");
            return res.status(500).json({ message: "Username/email already exist" });
        }
        const newUser = new User({ username, email, password, photo: userPhoto });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.log("Error while creating user : ", error);
        res.status(500).json({ message: "Could not create User! Please try again later..." });
    }
};

exports.addPhoto = async (req, res) => {
    try {
        const { photo } = req.body
        const _id = req.user.id;
        if (!_id) {
            console.error("ID not provided")
            return res.status(400).json({ message: "Id is required to update the user data!" })
        }
        const user = await User.findById(req.user.id);
        if (!user) {
            console.log("user not found")
            return res.status(404).json({ message: `No user found with id ${_id}` })
        }

        user.photo = photo || user.photo;

        await user.save()
        {
            const { username, email, photo, role, scene, chapter, achievements } = user
            res.status(200).json({ message: "User updated successfully", user: {_id, username, email, photo, role, scene, chapter, achievements} })
        }

    } catch (error) {
        console.error("Error while updating user:", error)
        res.status(500).json({ message: "Could not update user! Please try again later..." })
    }
}

exports.getUserById = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log("Error while fetching user : ", error);
        res.status(500).json({ message: "Could not fetch User! Please try again later..." });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        if (!(await isAdmin(req.user.id)))
            return res.status(401).json({ message: "Unauthorized" })
        res.status(200).json(users);
    } catch (error) {
        console.log("Error while fetching users : ", error);
        res.status(500).json({ message: "Could not fetch Users! Please try again later..." });
    }
};

exports.checkUsername = async (req, res) => {
    try {
        const { username } = req.query
        const user = await User.find({ username });
        if (user && user.length !== 0) {
            console.log("existtttt : ")
            return res.status(200).json({ message: `${username} already exist!`, exists: true });
        }
        res.status(200).json({ message: `${username} is available!`, exists: false })
    } catch (error) {
        console.log("Error while checking username : ", error);
        res.status(500).json({ message: "Error while checking username..." });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const result = await User.findByIdAndDelete(req.user.id);
        if (!result) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.log("Error while deleting user : ", error);
        res.status(500).json({ message: "Could not delete User! Please try again later..." });
    }
};

exports.setGameState = async (req, res) => {
    try {
        const { scene_id, display_word, wrong_guessed, hint, level } = req.body;
        const user_id = req.user.id;
        const userExists = await User.findById(user_id);
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log("level : ", level)
        const sceneExists = await Scene.findOne({ scene_number: scene_id });
        if (!sceneExists) {
            return res.status(404).json({ message: "Scene not found" });
        }

        let gameState = await UserGameState.findOne({ user_id });

        if (gameState) {
            gameState.scene_id = scene_id;
            gameState.display_word = display_word;
            gameState.wrong_guessed = wrong_guessed;
            if (hint != -1)
                gameState.hint = hint;
            await gameState.save();
            return res.status(200).json({ message: "Game state updated successfully" });
        }
        else {
            gameState = new UserGameState({ user_id : req.user.id, scene_id, display_word, wrong_guessed, hint, level });
            await gameState.save();
            res.status(201).json({ message: "Game state created successfully" });
        }
    } catch (error) {
        console.error("Error while setting user game state: ", error);
        res.status(500).json({ message: "Error while setting user game state" });
    }
};

exports.getGameState = async (req, res) => {
    try {
        const user_id = req.user.id;
        const userExists = await User.findById(user_id);
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }

        const gameState = await UserGameState.findOne({ user_id }).populate('scene_id');
        if (!gameState) {
            return res.status(404).json({ message: "Game state not found for this user" });
        }

        res.status(200).json({ gameState });
    } catch (error) {
        console.error("Error while fetching user game state: ", error);
        res.status(500).json({ message: "Error while fetching user game state" });
    }
};

exports.deleteGameState = async (req, res) => {
    try {
        const userExists = await UserGameState.findOneAndDelete({user_id : req.user.id});
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message : "User Game Restarted!" });
    } catch (error) {
        console.error("Error while deling user game state: ", error);
        res.status(500).json({ message: "Error while deliting user game state" });
    }
};

exports.isAuth = async (req, res) => {
    try {
        const id = req.user.id
        res.status(200).json({ message : "User is authenticated!" });
    } catch (error) {
        console.error("Error while authenticating user ", error);
        res.status(500).json({ message: "Error while authenticating user" });
    }
}
exports.getStats = async (req, res) => {
    try {
        const id = req.user.id
        console.log(id)
        const gameState = await UserGameState.findOne({user_id : id})
        if(!gameState)
        {
            console.log("no user")
            return res.status(404).json({message : "no user found"})
        }
        res.status(200).json({ stats : {chapter : gameState.level, scene : gameState.scene_id}});
    } catch (error) {
        console.error("Error while getting user stats", error);
        res.status(500).json({ message: "Error while getting user stats" });
    }
}



