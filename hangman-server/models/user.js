const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email : {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: "https://th.bing.com/th/id/OIG3.UrwSVrCs0Z7hqIAC6RtR?w=1024&h=1024&rs=1&pid=ImgDetMain"
    },
    role : {
        type : String,
        default : "user"
    },
    achievements : {
        type : String,
        default : "none"
    },
    scene : {
        type : Number,
        default : 1
    },
    chapter : {
        type : Number,
        default : 1
    }
}, { timestamps: true });






// Hash password before saving
userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});







const User = mongoose.model("User", userSchema);

module.exports = User;
