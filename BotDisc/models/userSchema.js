const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({       //schema de users para mongo DB
    userID: {type: String, required:true, unique:true},
    userName: {type: String, required:true, unique:true},
    name: {type: String, default:null},
    age: {type: String, default:null},
    description: {type: String, default:null},

});

const model = mongoose.model("usuarios", usersSchema);      //usa mongoose para crear el modelo

module.exports = model;