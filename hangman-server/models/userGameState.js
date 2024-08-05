const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userGameStateSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    scene_id: {
        type: Number,
        required: true
    },
    display_word: {
        type: String,
    },
    wrong_guessed: {
        type: String,
    },
    hint: {
        type: Number,
        required: true
    },
}, { timestamps: true });

const UserGameState = mongoose.model("UserGameState", userGameStateSchema);

module.exports = UserGameState;
