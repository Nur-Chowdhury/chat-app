const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 50,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    password: {
        type: String,
        required: true,
        max: 50,
    },
    isAvatarSet: {
        type: Boolean,
        default: false,
    },
    avatar: {
        type: String,
        default: "",
    },
});


module.exports = mongoose.model("Users", userSchema);