//PAQUETES para canvas pero no me deja instalarlo no se porque
// const {createCanvas, loadImage} = require("canvas");
// const {join} = require("path");
//ENDPAQUETES

//modelos
const userModel = require ("../../models/userSchema"); //requiere el modelo de usuario para poder introducir datos en MongoDB
//END modelos



require("dotenv").config(); //requiere del .env para la conexion a la base de datos
const prefix = process.env.PREFIX;

module.exports = async (client,discord,member) => {
    // console.log(member.user.username);

    //REGISTRAR USER

    try {
        let user = await userModel.create({     // try/catch para crear a un usuario segun los datos del modelo pasando los datos indicados para esos campos
            userID: member.id,
            userName: member.displayName,
        });
        user.save();
    } catch (error) {
        console.log(error)
    }

    //END REGISTRO



    const channel = member.guild.channels.cache.find(   //realiza la accion en el canal indicado
        (channel) => channel.name === "despedidas"  //tambien se puede hacer por channel id
    );


    //ROLES
    const guild = member.guild;

    // guild.roles.cache.array.forEach((role) => {         //devuelve el rol y el id de rol de cada usuario, para poder manipularlos despues
    //     console.log(`Name: ${role.name} ID: ${role.id}`);
    // });

    const rol = guild.roles.cache.find((role) => role.name ==="coder");  //buscar rol por nombre, tambien se puede hacer por ID

    // member.roles.add(rol); //añade el rol a los usuarios

    //END ROLES

    const me = new discord.MessageEmbed()   //mensaje embed que se envia cuando entra un usuario al canal
    .setColor("GOLD")
    .setTitle("¡Bienvenid@!")
    .setURL("https://google.com")
    //Forma deprecated de usar setauthor
    //     "PONG COMMAND",
    //     "https://imgur.com/gallery/H37kxPH",
    //     "https://discord.com"
    .setAuthor({                                        //cambiado para que salga la informacion del nuevo miembro que se acaba de unir al canal
        name: member.user.username,                     //nuevo miembro
        url: member.user.displayAvatarURL(),            //avatar
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




    const btn1 = new discord.MessageButton()  //crea el boton
    .setCustomId("acp")
    .setLabel("Acepto")
    .setStyle("SUCCESS");
  const btn2 = new discord.MessageButton()
    .setCustomId("deg")
    .setLabel("No Acepto")
    .setStyle("DANGER");
  //% BUTTONS

    //FILA
    const fila = new discord.MessageActionRow().addComponents(btn1, btn2);  //se declara despues de los botones porque sino no los encuentra
    //END FILA


    const msgE = {                                  //RIGUROSO MENSAJE EMBEDIDO
        title: "Reglas",
        description: "Estas son las reglas del canal",
        color: 65535,
        author: {
            name:"Respeta",
            icon_url:"https://i.imgur.com/H37kxPH.jpeg",
        },
        fields:{
            name:"No hay que hacer más",
            value:"Disfruta"
        },
    };

    channel.send({embeds: [me, msgE], components: [fila]});



    channel.send("Hola");

};