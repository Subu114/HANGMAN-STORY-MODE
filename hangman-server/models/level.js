const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const levelSchema = new Schema({
    level: {
        type: Number,
        required: true,
        unique : true
    },
    title : {
        type: String,
        default : 'Title'
    },
    description: {
        type: String,
        required: true
    },
    next_level: {
        type: Number,
        required : true,
        default : -1
    },

    
}, { timestamps: true });


const Level = mongoose.model("Level", levelSchema);

module.exports = Level;
