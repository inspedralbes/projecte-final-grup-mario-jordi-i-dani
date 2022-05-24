module.exports = {    //exporta el comando slash
    name: "ban",
    description: "Banea a un usuario",
    options: [
      {
        name: "usuario",    //opciones para poner tras el comando, en este caso ambas requeridas
        description: "usuario a banear",
        type: "USER",
        required: "true",
      },
      {
        name: "razon",
        description: "razon del baneo",
        type: "STRING",
        required: "true",
      },
    ],
    permissions: ["BAN_MEMBERS"],   //permisos necesarios poara utilizar el comando
    run: async (client, interaction) => {
      //Id del canal logs 890778271711637575
      let channel = interaction.guild.channels.cache.find(    //canal donde saldra el mensaje embed al banea a alguien
        (c) => c.id == "978339946903511040"
      );
  
      let user = interaction.options.getMember("usuario");    
      let razon = interaction.options.getString("razon");
      let fecha = parseInt(interaction.createdTimestamp / 1000);  //fecha en unix base timestamp pasada a algo legible
  
      //Embed como objeto
  
      const emb = {     //emmbed msg del baneo
        author: {
          name: "BANEADO POR BOBO",
          icon_url:
            "https://cdn3.iconfinder.com/data/icons/pyconic-icons-2-1/512/ban-512.png",
        },
        title: `${user.user.username}`,
        description: `Razon de baneo: ${razon}\n <t:${fecha}:F>\n Id: ||${user.user.id}||`,
        timestamp: interaction.createdTimestamp,
        color: 16711680,
      };
  
      try {
        channel.send({ embeds: [emb] });  //envia el mensaje al canal de texto indicado antes
  
        // if (!user.user.bot) {
        //   user.send({ embeds: [emb] });
        // }
        user.ban();
        return interaction.reply({      //si ha salido bien te dice que baneo exitoso sino que ha fallado y te duevuelve la id del usuario baneado para poder desbanearlo si quieres
          content: `Baneo Exitoso ID: ||${user.user.id}||`,
          ephemeral: true,
        });
      } catch (error) {
        console.log(error);
        return interaction.reply({
          content: `Baneo Fallido ID: ||${user.user.id}||`,
          ephemeral: true,
        });
      }
    },
  };