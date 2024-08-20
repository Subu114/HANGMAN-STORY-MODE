const { isAdmin } = require("../authenticate/isAdmin");
const Level = require("../models/level");
const User = require("../models/user");
const UserGameState = require("../models/userGameState");


exports.getAllLevels = async (req, res) => {
    try {
        const { _id } = req.query;
        console.log(_id)
        const allLevels = await Level.find({}).sort({ level: 1 });

        if (_id) {
            const user = await User.findById(_id)
            console.log(user)
            if (user.role === 'admin')
                return res.status(200).json({ levels: allLevels })
        }
        
        const userGame = await UserGameState.findOne({ user_id: _id });
        let levels;


        if (!_id || !userGame) {
            levels = allLevels.map((level, index) => {
                if (index === 0) {
                    return level;
                }
                return {
                    ...level.toObject(),
                    description: 'Conquer past trials to unlock the way',
                };
            });
        } else {

            levels = allLevels.map((level, index) => {
                if (index === 0 || (level.level <= userGame.level)) {
                    console.log("Returning this level : ", level)
                    return level;
                }
                return {
                    ...level.toObject(),
                    description: 'Conquer past trials to unlock the way',
                };
            });
        }
        res.status(200).json({ levels });
    } catch (error) {
        console.error("Error while fetching levels: ", error);
        res.status(500).json({ message: "Could not fetch levels! Please try again later..." });
    }
};


exports.getLevel = async (req, res) => {
    try {
        let { levelNumber } = req.params
        console.log("SCEne id : ", levelNumber)
        levelNumber = Number(levelNumber)

        const level = await Level.findOne({ level: levelNumber })
        if (!level) {
            console.log("no level found")
            return res.status(404).json({ message: "No Level found for the number" })
        }

        return res.status(200).json({ level })
    } catch (error) {
        console.log("Error while fetching level : ", error);
        res.status(500).json({ message: "Could not fetch level! Please try again later..." });
    }
}

exports.putLevel = async (req, res) => {
    try {
        if (!(await isAdmin(req?.user?.id))) {
            return res.status(403).json({ message: "UNAUTHORISED ACCESS" })
        }
        const { level, title, description, next_level } = req.body

        console.log(req.body)

        if (!level || !title || !description || !next_level) {
            console.error("Incomplete Level Details Provided")
            return res.status(400).json({ message: "Please provide full Level Details!" })
        }

        const levelExist = await Level.findOne({ level });
        if (levelExist) {
            console.log("Level already exist")
            return res.status(409).json({ message: `Level already exist with number ${level}` })

        }


        const myLevel = new Level({ level, title, description, next_level })
        await myLevel.save()

        res.status(201).json({ message: "Level created successfully", level: myLevel })

    } catch (error) {
        console.error("Error while creating Scene:", error)
        res.status(500).json({ message: "Could not create Scene! Please try again later..." })
    }
}


exports.deleteScene = async (req, res) => {
    try {
        if (!(await isAdmin(req.user.id))) {
            return res.status(403).json({ message: "UNAUTHORISED ACCESS" })
        }
        let { levelNumber } = req.params;

        levelNumber = Number(levelNumber);

        // Find and delete the scene
        const result = await Level.deleteOne({ level: levelNumber });

        if (result.deletedCount === 0) {
            console.log("Level Number Not Found");
            return res.status(404).json({ message: "Level not found" });
        }

        res.status(200).json({ message: "Level deleted successfully" });
    } catch (error) {
        console.log("Error while deleting LEvel:", error);
        res.status(500).json({ message: "Could not delete Level! Please try again later..." });
    }
};

exports.updateLevel = async (req, res) => {
    try {
        if (!(await isAdmin(req.user.id))) {
            return res.status(401).json({ message: "UNAUTHORISED ACCESS" })
        }
        const { level, title, description, next_level } = req.body


        const myLevel = await Level.findOne({ level });
        if (!myLevel) {
            console.log("Level not found")
            return res.status(404).json({ message: `No Level found with number ${level}` })
        }
        myLevel.level = level
        myLevel.title = title
        myLevel.description = description
        myLevel.next_level = next_level

        await myLevel.save()

        res.status(200).json({ message: "Level updated successfully", myLevel })
    } catch (error) {
        console.error("Error while updating level:", error)
        res.status(500).json({ message: "Could not update level! Please try again later..." })
    }
}

