const fs = require("fs");
                                                                            //este es el handler de eventos, igual que el de comandos pero para eventos
module.exports = (client,discord) => {
    console.log("------------------EVENTOS------------------");
    //CODIGO
    fs.readdirSync("./events/").forEach((dir) => {
        const events = fs
            .readdirSync(`./events/${dir}`)
            .filter((file) => file.endsWith(".js"));

        for (const file of events) {
            try {
                let evn = require(`../events/${dir}/${file}`);

                if(evn.event && typeof evn.event !== "string"){             //si el tipo del evento es diferente de STRING da un error
                    console.log(`Error: ${file}`);
                    continue;
                }
                evn.event = evn.event || file.replace(".js", "");           //quita la extension al evento

                client.on(evn.event, evn.bind(null, client, discord));
                console.log(`Evento cargado: ${file}`);
            } catch (error) {
                console.log("Error en la carga de eventos");
                console.log(error);
            }
        }
    });

    //END CODIGO
    console.log("------------------EVENTOS------------------");
};