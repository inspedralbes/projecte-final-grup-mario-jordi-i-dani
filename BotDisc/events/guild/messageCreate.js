require("dotenv").config();
const prefix = process.env.PREFIX;

//modelos
const userModel = require ("../../models/userSchema");
//END modelos

module.exports = async (client,discord, message) => {
    console.log( message);

    if(message.author.bot)
    return console.log(`Mensaje del bot: ${message.author.username}`);

    //REGISTRAR USER despues de comprobar que no sea un bot claro esta...

    let userData;
    try {
        userData = await userModel.findOne({userID: message.author.id});
        if(!userData){
            let user = await userModel.create({
            userID: message.author.id,
            userName: message.author.username,
            serverID: message.guild.id,
            });
            user.save();
        }else{
            console.log("usuario ya registrado");
        }
    } catch (error) {
        console.log(error);
    }

    //END REGISTRO

    if (!message.content.startsWith(prefix))
     return message.reply("Esto no es un comando");

    const args = message.content.slice(prefix.length).split(/ +/);        //division del argumento y el comando
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find((a) => a.aliases && a.aliases.includes(cmd));  //busca los comandos o busca los alias del comando dentro del archivo donde se encuentra el comando

    if(command) command.execute(client,message,args,discord);
    if(!command) return  message.channel.send("¡Este comando no existe!");
};