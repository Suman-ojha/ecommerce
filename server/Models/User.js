const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum :["active" , "inactive" , "delete"],
        default :'active'
    },
    profilepic: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    },
    role: {
        type: String,
        default: "user",
    },
},
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
