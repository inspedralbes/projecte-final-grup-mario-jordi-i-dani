// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//     username: mongoose.SchemaTypes.String,
//     discordId: {
//         type: mongoose.SchemaTypes.String,
//         required: true,
//     }
// });

// module.exports = mongoose.model('User', UserSchema);

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: mongoose.SchemaTypes.String,
    userID: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    userName: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    serverID: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
});

// module.exports = mongoose.model('User', UserSchema);

const model = mongoose.model("usuarios",UserSchema);
module.exports = model;