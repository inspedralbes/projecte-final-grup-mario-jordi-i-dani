require("dotenv").config();

const discord = require("discord.js");   //desestructuracion del paquete de discord para coger solo client e intents
const client = new discord.Client({                         //constante donde se guarda el nuevo cliente
    intents: 32767,                                            //permisos, este numero representa todos los permisos para el bot y esta sacado de una calculadora de intents
    partials:["GUILD_MEMBER","USER","CHANNEL","MESSAGE","REACTION"],    //lo necesario para guardar una nueva conexión
});


// const prefix = process.env.PREFIX;

//MONGO

const mongoose = require("mongoose");       //paquete mongoose
const mg = process.env.DB;                  //datos conexion a la bbdd

mongoose.connect(mg, {                  //conexion ala bbdd
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Conectado a MongoDB");
}).catch((e) => {
    console.log(e);
});

//END MONGO



//CODIGO

client.commands = new discord.Collection(); //colecciones
client.events = new discord.Collection();
client.slash = new discord.Collection();

["commandHandler", "eventHandler", "slashHandler"].forEach((file) => {      //handlers utilizados
    require(`./handlers/${file}`)(client, discord);
});

//END CODIGO

client.login(process.env.DSTOKEN);      //token del bot

