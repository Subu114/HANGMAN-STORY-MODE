const { isAdmin } = require("../authenticate/isAdmin");
const Scene = require("../models/scene");



exports.getAllScenes = async (req, res) => {
    try {
        if (!(await isAdmin(req?.user?.id))) {
            return res.status(403).json({ message: "UNAUTHORISED ACCESS" })
        }
        const scenes = await Scene.find({}).sort({ scene_number: 1 })
        
        res.status(200).json({ scenes })
    } catch (error) {
        console.log("Error while fetching Scenes : ", error);
        res.status(500).json({ message: "Could not fetch Scenes! Please try again later..." });
    }
}

exports.getScene = async (req, res) => {
    try {
        let { sceneNumber, level } = req.params
        console.log("SCEne id : ", sceneNumber)
        sceneNumber = Number(sceneNumber)
        level = Number(level)
        if (!sceneNumber && !level) {
            console.log("No scene number provieded or invalid scene number ");
            return res.status(404).json({ message: "Please provide a valid Scene Number!" })
        }
        const scene = await Scene.findOne({ scene_number: sceneNumber, level})
        if (!scene) {
            console.log("The game is completed")
            return res.status(200).json({ message: "not found scenes re baba" })
        }
        if ((await isAdmin(req.user.id))) {
            return res.status(200).json({ scene })
        }
        else {
            console.log("WORD : ", scene.scene_word)
            scene.scene_word = scene.scene_word.length;
            return res.status(200).json({ scene })


        }

    } catch (error) {
        console.log("Error while fetching Scenes : ", error);
        res.status(500).json({ message: "Could not fetch Scenes! Please try again later..." });
    }
}

exports.getSceneWord = async (req, res) => {
    try {
        let { sceneNumber, level } = req.params
        const { unique_token } = req.body
        console.log(sceneNumber)
        console.log("p : ", unique_token)
        sceneNumber = Number(sceneNumber)
        if (!sceneNumber && !level) {
            console.log("No scene number provieded or invalid scene number ");
            return res.status(404).json({ message: "Please provide a valid Scene Number!" })
        }

        if (!unique_token || unique_token != process.env.SCENE_WORD_KEY) {
            console.log("Invalid or missing unique token");
            console.log(`${process.env.SCENE_WORD_KEY}==${unique_token}`)
            return res.status(403).json({ message: "Unauthorised" });
        }

        const scene = await Scene.findOne({ scene_number: sceneNumber, level })
        if (!scene) {
            console.log("The Scene doesnt exist")
            return res.status(404).json({ message: "Scene doesnt exist!" })
        }
        console.log("SCENE : ", scene.scene_word)
        res.status(200).json({ scene_word: scene.scene_word })
    } catch (error) {
        console.log("Error while fetching Scenes : ", error);
        res.status(500).json({ message: "Could not fetch Scenes! Please try again later..." });
    }
}

exports.putScene = async (req, res) => {
    try {
        if (!(await isAdmin(req?.user?.id))) {
            return res.status(403).json({ message: "UNAUTHORISED ACCESS" })
        }
        const { scene_number, scene_place, scene_story, scene_clue, scene_word, scene_img, next_scene, level } = req.body

        console.log(req.body)

        if (!scene_number || !scene_place || !scene_story || !scene_clue || !scene_word || !scene_img || !next_scene || !level) {
            console.error("Incomplete Scene Details Provided")
            return res.status(400).json({ message: "Please provide full Scene Details!" })
        }
        if (scene_number < 1) {
            console.log("No scene number provieded or invalid scene number ");
            return res.status(404).json({ message: "Please provide a valid Scene Number!" })
        }

        const sceneExist = await Scene.findOne({ scene_number, level });
        console.log(sceneExist)
        if (sceneExist) {
            console.log("Scene already exist")
            return res.status(409).json({ message: `Scene already exist with scene number ${scene_number}` })

        }

        const scene = new Scene({ scene_number, scene_place, scene_story, scene_clue, scene_word, scene_img, next_scene, level })
        await scene.save()

        res.status(201).json({ message: "Scene created successfully", scene })
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
        let { sceneNumber } = req.params;
        console.log("Scene number:", sceneNumber);
        sceneNumber = Number(sceneNumber);

        // Validate sceneNumber
        if (isNaN(sceneNumber) || sceneNumber < 1 || sceneNumber > process.env.MAX_LEVELS) {
            console.log("No scene number provided or invalid scene number");
            return res.status(400).json({ message: "Please provide a valid Scene Number!" });
        }

        // Find and delete the scene
        const result = await Scene.deleteOne({ scene_number: sceneNumber });

        if (result.deletedCount === 0) {
            console.log("Scene Number Not Found");
            return res.status(404).json({ message: "Scene not found" });
        }

        res.status(200).json({ message: "Scene deleted successfully" });
    } catch (error) {
        console.log("Error while deleting Scene:", error);
        res.status(500).json({ message: "Could not delete Scene! Please try again later..." });
    }
};

exports.updateScene = async (req, res) => {
    try {
        if (!(await isAdmin(req.user.id))) {
            return res.status(401).json({ message: "UNAUTHORISED ACCESS" })
        }
        const { scene_number, scene_place, scene_story, scene_clue, scene_word, scene_img, next_scene, level } = req.body

        if (!scene_number) {
            console.error("Scene Number not provided")
            return res.status(400).json({ message: "Scene Number is required to update the scene!" })
        }

        const scene = await Scene.findOne({ scene_number, level });
        if (!scene) {
            console.log("Scene not found")
            return res.status(404).json({ message: `No scene found with scene number ${scene_number}` })
        }

        scene.scene_place = scene_place || scene.scene_place;
        scene.scene_story = scene_story || scene.scene_story;
        scene.scene_clue = scene_clue || scene.scene_clue;
        scene.scene_word = scene_word || scene.scene_word;
        scene.scene_img = scene_img
        scene.next_scene = next_scene
        scene.level = level

        await scene.save()

        res.status(200).json({ message: "Scene updated successfully", scene })
    } catch (error) {
        console.error("Error while updating Scene:", error)
        res.status(500).json({ message: "Could not update Scene! Please try again later..." })
    }
}

