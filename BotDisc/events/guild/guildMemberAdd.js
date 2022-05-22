//PAQUETES para canvas pero no me deja instalarlo no se porque
// const {createCanvas, loadImage} = require("canvas");
// const {join} = require("path");
//ENDPAQUETES

//modelos
const userModel = require ("../../models/userSchema");
//END modelos



require("dotenv").config();
const prefix = process.env.PREFIX;

module.exports = async (client,discord,member) => {
    // console.log(member.user.username);

    //REGISTRAR USER

    try {
        let user = await userModel.create({
            userID: member.id,
            userName: member.displayName,
            serverID: member.guild.id,
        });
        user.save();
    } catch (error) {
        console.log(error)
    }

    //END REGISTRO



    const channel = member.guild.channels.cache.find(   //realiza la accion en el canal indicado
        (channel) => channel.name === "despedidas"  //tambien se puede hacer por id
    );


    //ROLES
    const guild = member.guild;

    // guild.roles.cache.array.forEach((role) => {         //devuelve el rol y el id de rol de cada usuario, para poder manipularlos despues
    //     console.log(`Name: ${role.name} ID: ${role.id}`);
    // });

    const rol = guild.roles.cache.find((role) => role.name ==="coder");  //buscar rol por nombre, tambien se puede hacer por ID

    member.roles.add(rol); //añade el rol a los usuarios

    //END ROLES

    const me = new discord.MessageEmbed()
    .setColor("GOLD")
    .setTitle("¡Bienvenid@!")
    .setURL("https://google.com")
    //Forma deprecated de usar setauthor
    //     "PONG COMMAND",
    //     "https://imgur.com/gallery/H37kxPH",
    //     "https://discord.com"
    .setAuthor({                                        //cambiado para que salga la informacion del nuevo miembro que se acaba de unir al canal
        name: member.user.username,       //nuevo miembro
        url: member.user.displayAvatarURL(), //avatar
    })
    .setDescription(`Bienvenid@ al servidor ${member.guild.name}`)
    .setThumbnail("https://i.imgur.com/H37kxPH.jpeg")
    .setImage("https://i.imgur.com/H37kxPH.jpeg")
    .setTimestamp()
    .setFooter(
        {
            text: `${member.guild.name}`, 
            iconURL: `${member.user.displayAvatarURL()}`
        }
    );

    channel.send({embeds: [me]});



    channel.send("Hola");

};