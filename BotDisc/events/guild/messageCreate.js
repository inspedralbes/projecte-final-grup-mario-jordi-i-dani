require("dotenv").config();
const prefix = process.env.PREFIX;

//modelos
const userModel = require ("../../models/userSchema");
//END modelos

module.exports = async (client,discord, message) => {
    //console.log( message);

    if(message.author.bot)      //comprueba si es un bot quien ha mandado el msg
    return console.log(`Mensaje del bot: ${message.author.username}`);

    //REGISTRAR USER despues de comprobar que no sea un bot claro esta...

    let userData;
    try {
        userData = await userModel.findOne({userID: message.author.id});        //busca el userID en la bbdd
        if(!userData){
            let user = await userModel.create({                                 //si no esta creado lo crea
            userID: message.author.id,                                          //guarda los siguientes datos(los requeridos por el schema)
            userName: message.author.username,
            });
            user.save();                                                        //lo guarda en la bbdd
        }else{
            console.log("usuario ya registrado");
        }
    } catch (error) {
        console.log(error);
    }

    //END REGISTRO

    // if (!message.content.startsWith(prefix))
    //  return message.reply("Esto no es un comando");

    const args = message.content.slice(prefix.length).split(/ +/);        //division del argumento y el comando
    const cmd = args.shift().toLowerCase();                                //pone el comando en minusculas

    const command = client.commands.get(cmd) || client.commands.find((a) => a.aliases && a.aliases.includes(cmd));  //busca los comandos o busca los alias del comando dentro del archivo donde se encuentra el comando

    if(command) command.execute(client,message,args,discord);


    
    // else if (command) command.run
    // if(!command) return  message.channel.send("¡Este comando no existe!");
};