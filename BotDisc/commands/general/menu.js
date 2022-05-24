module.exports = {
    name: "menu",
    aliases: ["mn", "img"],
    description: "Ejemplo de menu",
    async execute(client, message, args, discord) {
      //# MENU
      //Crea un menu con una dropbox con 3 opciones
      const menu = new discord.MessageSelectMenu()
        .setCustomId("menu1")
        .setPlaceholder("Selecciona un tema")
        .addOptions([
          { label: "Mongo db", description: "Imagen de Mongo", value: "dog" },
          { label: "El virtula", description: "Imagen de gatitos", value: "cat" },
          { label: "nada", description: "nada de nada", value: "ing" },
        ]);
      //# MENU
      //& ROW
      //Container para que fuera un menu
      const row = new discord.MessageActionRow().addComponents(menu);
      //& ROW
  
      //% BUTTONS
      const btn1 = new discord.MessageButton()
        .setCustomId("ejm")
        .setLabel("Btn1")
        .setEmoji("🆔")
        .setStyle("SUCCESS");
      const btn2 = new discord.MessageButton()
        .setCustomId("ejm2")
        .setLabel("Btn2")
        .setStyle("DANGER");
      //% BUTTONS
  
      //& FILA
  
      const fila = new discord.MessageActionRow().addComponents(btn1, btn2);
  
      //& FILA
      
      //Aqui le decimos que envia primero la row y despues la fila
      message.channel.send({
        content: "Hola soy un menu",
        components: [row, fila],
      });
    },
  };