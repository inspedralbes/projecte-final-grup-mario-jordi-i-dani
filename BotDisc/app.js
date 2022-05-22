require("dotenv").config();

const discord = require("discord.js");   //desestructuracion del paquete de discord para coger solo client e intents
const client = new discord.Client({                         //constante donde se guarda el nuevo cliente
    intents:["GUILDS", "GUILD_MESSAGES","GUILD_MEMBERS"],    //lo necesario para guardar una nueva conexión
});


// const prefix = process.env.PREFIX;

//MONGO

const mongoose = require("mongoose");
const mg = process.env.DB;

mongoose.connect(mg, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Conectado a MongoDB");
}).catch((e) => {
    console.log(e);
});

//END MONGO



//CODIGO

client.commands = new discord.Collection();
client.events = new discord.Collection();

["commandHandler", "eventHandler"].forEach((file) => {
    require(`./handlers/${file}`)(client, discord);
});

//END CODIGO

client.login(process.env.DSTOKEN);

