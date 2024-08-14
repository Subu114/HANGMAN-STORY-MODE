const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sceneSchema = new Schema({
    scene_number: {
        type: Number,
        required: true,
    },
    scene_place: {
        type: String,
        required: true
    },
    scene_story: {
        type: String,
        required: true
    },
    scene_clue: {
        type: String,
        required: true
    },
    scene_word: {
        type: String,
        required: true
    },
    scene_img: {
        type: String,
        default: ""
    },
    next_scene: {
        type: Number,
        default: -1
    },
    level: {
        type: Number,
        default: -1
    },
    pre_progression: {
        type: String,
        required: true
    },
    post_progression: {
        type: String,
        required: true
    },
    pre_progression_img: {
        type: String,
        required: true
    },
    post_progression_img: {
        type: String,
        required: true
    }

}, { timestamps: true });


const Scene = mongoose.model("Scene", sceneSchema);

module.exports = Scene;
