module.exports = {
    name: "reglas",
    aliases: ["rules"],
    description: "Muestra las reglas y da rol",
    async execute(client, message, args, discord) {
      //% BUTTONS
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




        //MENSAJES

        const msgE = {                                  //RIGUROSO MENSAJE EMBEDIDO
            title: "Reglas",
            description: "Estas son las reglas del canal",
            color: 65535,
            author: {
                name:"XIAO JIN PING",
                icon_url:"https://i.imgur.com/H37kxPH.jpeg",
            },
            fields:{
                name:"Ama a tu presidente y por encima de todo a tu país",
                value:"Fecha de ejecución: desconocida (por el momento)"
            },
        };  

        //END MENSAJES

        message.channel.send({ embeds: [msgE], components: [fila] }); //envia el mensaje embed y el componente fila que son los botones
    }, 
};