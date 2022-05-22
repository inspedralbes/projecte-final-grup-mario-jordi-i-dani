const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    userID: {type: String, required:true, unique:true},
    userName: {type: String, required:true, unique:true},
    serverID: {type: String, required:true},

});

const model = mongoose.model("usuarios", usersSchema);

module.exports = model;