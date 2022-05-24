module.exports = {
    name:"comandos",                             //comando importante para el desarrollo del bot
    descripcion:"Comandos del server",
    async execute(client,message,args,discord){
        
        const comandos = new discord.MessageEmbed()
        .setColor("GOLD")
        .setTitle("Comandos")
        .setURL("http://quizbot.alumnes.inspedralbes.cat:7005")
        .setAuthor({                                   
            name: "JMDBot",
            url: "https://discord.com",
            iconURL: "https://i.imgur.com/H37kxPH.jpeg"
        })
        .setDescription("Estos son los comandos del canal")
        .addFields(
            {
                name:"!play o /play + nombre de cancion o autor o ambas",
                value:"Reproduce una canción en el canal de voz en el que estás."
            },
            {
                name:"!pause o /pause",
                value:"Para la canción en el canal de voz en el que estás."
            },
            {
                name:"!resumen o /resumen",
                value:"Vuelve a reproducir la canción en el canal de voz en el que estás."
            },
            {
                name:"/ban + nombre + motivo",
                value:"Si tienes un rol con permisos de baneo te deja banear a alguien y manda un mensaje al canal de logs con la persona baneada y su id."
            },
            {
                name:"/unban + id",
                value:"Si tienes un rol con permisos de baneo te deja desbanear a alguien y manda un mensaje al canal de logs con la persona desbaneada y su id."
            },
            {
                name:"/mencion + nombre",
                value:"Te deja mencionar a alguien y le manda una notificación"
            },
            {
                name:"/mencion + nombre",
                value:"Te deja mencionar a alguien y le manda una notificación"
            },
            {
                name:"!menu",
                value:"Muestra un menú con opciones seleccionables, algunas de estas tienen como respuesta media attachments, solo es una prueba"
            },
            {
                name:"!reglas",
                value:"Muestra las 'reglas' del canal y dos botones, si aceptas te deja segui tranquilamente, si no aceptas te expulsa del canal"
            },
            {
                name:"!clear + número de mensajes o !del + número de mensajes",
                value:"Te permite borrar mensajes en el canal de texto que lo usas, un máximo de 99"
            },
        )
        .setImage("https://i.imgur.com/H37kxPH.jpeg")
        .setTimestamp()
        .setFooter(
            {
                text: "JMD GROUP", 
                iconURL: "https://i.imgur.com/H37kxPH.jpeg"
            }
        );
           
         

        message.channel.send({ embeds: [comandos] });


    },
};