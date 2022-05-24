const { Collection } = require("mongoose");
const userSchema = require ("../../models/userSchema");

module.exports = { //module exports son las instrucciones que le dicen a node que llevarse para que sea accesible desde otros archivos
  name: "perfil",
  aliases: [],
  description: "Registro de datos personalizados",
  async execute(client, message, args, discord) {
    message.channel.send("Ingresa los datos que se te piden").then((m) => {
      message.channel.send("Nombre");
    });

    // Canal personalizado
    // let channel = message.guild.channels.cache.find(
    //   (m) => m.id == "893213236801974282"
    // );


    //Crea un filtro para comprobar que ambos id son iguales
    let filter = (m) => m.author.id == message.author.id;

    //Usamos el filtro en el MessageCollector, y le indicamos que 3 respuestas maximas.
    let collector = new discord.MessageCollector(message.channel, {
      filter,
      max: 3,
    });

    let counter = 1;
    let datos = [];

    //Le mandamos los datos
    collector.on("collect", (msg) => {
      if (counter == 1) {
        datos.push(msg.content);
        msg.channel.send("Edad");
      } else if (counter == 2) {
        datos.push(msg.content);
        msg.channel.send("Descripcion");
      } else {
        datos.push(msg.content);
        msg.channel.send("Gracias");
      }
      counter++;
    });


    //Cuando se acaba la collection haria lo siguiente
    collector.on("end", async (collected, reason) => {
    //   console.log(`Mensajes recolectados ${collected.size}`);
    //   console.log(`Razon del termino de coleccion: ${reason}`);
    //   console.log(datos);

    //guardar datos

    //Envia los datos a mongo y los guarda
    let update = await userSchema.findOneAndUpdate(
        {userID: message.author.id},
        {name:datos[0],age:datos[1],description: datos[2]});
    update.save();
    //guardar datos
    });
  },
};