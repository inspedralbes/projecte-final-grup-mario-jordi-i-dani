const fs = require("fs");
let slash = [];                                           //array para guardar los comandos slash
                                                          //handler de comandos slash, como todos los handlers empieza igual
module.exports = (client, discord) => {
  console.log("---------------------- COMANDOS SLASH ----------------------");
  fs.readdirSync("./slashCommands/").forEach((dir) => {
    const commands = fs
      .readdirSync(`./slashCommands/${dir}/`)
      .filter((file) => file.endsWith(".js"));

    for (const file of commands) {
      try {
        let scmd = require(`../slashCommands/${dir}/${file}`);

        if (scmd.name) {
          client.slash.set(scmd.name, scmd);
          slash.push(scmd);
          console.log(`Comando: ${scmd.name}`);
        } else {
          console.log(`Error: ${file}`);
        }
      } catch (error) {
        console.log(`Error en el archivo: ${file}`);
      }
    }
  });
  console.log("---------------------- COMANDOS SLASH ----------------------");
  client.on("ready", async () => {           //cuando el bot este conectado, hace un set de los comandos slash, hay que expulsar al bot y traerlo de nuevo para que cargue los comandos nuevos
    await client.application.commands.set(slash);
  });
};