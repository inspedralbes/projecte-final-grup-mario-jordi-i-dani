module.exports = {      //slash command para mencionar a un usuario
    name: "mencion",
    description: "Menciona un rol o usuario",
    options: [
      {
        name: "usurol",
        description: "usuario/rol a mencionar", 
        type: "MENTIONABLE",
        required: "true",
      },
      {
        name: "mensaje",
        description: "mensaje a dar",
        type: "STRING",
        required: "true",
      },
    ],
    run: async (client, interaction) => {
      try {
        let mencionado;
        if (interaction.options._hoistedOptions[0].user == undefined) { //hoisted options es un objeto dentro de interaction que contiene datos con los que nos interesa jugar como los datos del usuario mencionado
          mencionado = interaction.options._hoistedOptions[0].role;
        } else {
          mencionado = interaction.options._hoistedOptions[0].user;
        }
        const mensaje = interaction.options._hoistedOptions[1].value;
        return interaction.reply({
          content: `${mencionado}: ${mensaje}`,
          ephemeral: false,
        });
      } catch (error) {
        return interaction.reply({ content: "Faltan datos" });
        // console.log("Error en sc: " + error);
      }
    },
  };