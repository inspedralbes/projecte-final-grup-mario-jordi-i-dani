const path = require("path"); //modulo de node para paths

module.exports = async (client, discord, interaction) => {
    //%BUTTONS
    if (interaction.isButton()) {   //si la interaccion es un boton pulsado
      interaction.deferReply({ ephemeral: false }); //el bot contesta con un mensaje efimero o no efimero (efimero == solo lo ve el usuario no efimero == lo ve todo el mundo)
      
  
      const member = interaction.member;
  
      if (interaction.customId === "acp") {   //si tiene la custom Id que le dimos al boton 
        let rol = "978273934665482280";   //coge un rol por id
        // member.roles.add(rol);         //lo añade al user que pulsa el boton con la id indicada
        return console.log("Acepto");
      }
      if (interaction.customId === "deg") {  
        member.kick();                    //se expulsa del servidor al miembro que pulse este boton
        return console.log("No Acepto");
      }
    }
    //%BUTTONS
  
    //# COMMANDS
    const emb = {
        author: {
          name: "Necesitas permisos",
          icon_url: "https://cdn-icons-png.flaticon.com/512/1633/1633103.png",
        },
        timestamp: interaction.createdTimestamp,
        color: 65280,
      };



    if (interaction.isCommand()) {      //si la interaccion es un comando

      const command = client.slash.get(interaction.commandName);

    if(!interaction.member.permissions.has(command.permissions || [])){   //comprueba que el usuario tenga permisos para usar los comandos slash que quiere
        return interaction.reply({embeds: [emb],ephemeral: true});
    }

      try {
        command.run(client, interaction);   //ejecuta comando
      } catch (error) {
        console.log("Error iC: " + error);
      }
    }
    //# COMMANDS
  




    //& MENU
    if (interaction.isSelectMenu()) {     //si la interaccion es un menu de seleccion
      if (interaction.customId == "menu1") {    //si el custom id dado al menu es el requerido
        
        const at = new discord.MessageAttachment(path.join(__dirname,"../../src","foto.png"));    //attachments que estan en src para poder ser enviados por el bot como respuesta a la seleccion hecha en el menu
        const vi = new discord.MessageAttachment(path.join(__dirname,"../../src","hola.txt"));
        const vi2 = new discord.MessageAttachment(path.join(__dirname,"../../src","elvirula-pispa.mp3"));

        switch (interaction.values[0]) {
          case "dog":
            await interaction.reply({content:'Mongo DB te encanta', ephemeral: true });   //si pulsas esta opcion te devuelve el contenido dentro del followUp
            interaction.followUp({ content: "Elegiste Mongo" , files: [at] });
            break;
          case "cat":
            await interaction.reply({content:'El virtual', ephemeral: true });
            interaction.followUp({ content: "Elegiste virulas" ,files: [vi,vi2] });
            break;
          case "ing":
            await interaction.reply({content:'No hay attachment lo sentimos', ephemeral: true });
            interaction.followUp({ content: "Elegiste nada" });
            break;
  
          default:
            await interaction.reply({content:'Pones lo que quieras', ephemeral: true });
            interaction.followUp({ content: "Error" });
            break;
        }
      }
    }
    //& MENU
  };














// module.exports = (client,discord,interaction) => {
//     // console.log(interaction);
//     if (interaction.isButton()) {
//         // interaction.deferReply(); // si la interaccion es un boton, devuelve una respuesta efimera(solo la ve el usuario que ha hecho click)
//         // interaction.followUp({content:"Bienvenido"});

//         const member = interaction.member;

//         const channel = member.guild.channels.cache.find(   //realiza la accion en el canal indicado
//             (channel) => channel.name === "despedidas"  //tambien se puede hacer por id
//         );

//         const bv = new discord.MessageEmbed()
//         .setColor("GOLD")
//         .setTitle("¡Bienvenid@!")
//         .setAuthor({                                        //cambiado para que salga la informacion del nuevo miembro que se acaba de unir al canal
//             name: member.user.username,       //nuevo miembro
//             url: member.user.displayAvatarURL(), //avatar
//         })
//         .setDescription(`Bienvenid@ al servidor ${member.guild.name}`)
//         .setTimestamp()
//         .setFooter(
//             {
//                 text: `${member.guild.name}`, 
//                 iconURL: `${member.user.displayAvatarURL()}`
//             }
//         );



//         if(interaction.customId === "acp"){
//             let rol = "978273934665482280";

//             member.roles.add(rol);      //si aceptas las reglas te otorga el rol coder

//             channel.send({embeds:[bv]});

//             return console.log("aceptó");
//         }
//         if(interaction.customId === "deg"){

//             member.kick();      //si haces click en no acepto te expulsa del server
//             return console.log("No aceptó");
//         }
//     }

//     //COMANDOS

//     if(interaction.isCommand()){


//         const command = client.slash.get(interaction.commandName);
//         try {
//             command.run(client,interaction);
//         } catch (error) {
//             console.log("Error en la interaccion:" + error);
//         }
//     }

//     //END COMANDOS
// };