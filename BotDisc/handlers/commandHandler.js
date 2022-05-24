const fs = require("fs");   //modulo file system de node para poder buscar archivos en el sistema de ficheros
                        //este handler sirve para detectar en que comando o comandos se encuentra el error o errores, también dice cuales se han iniciado correctamente

module.exports = (client,discord) => {
    console.log("------------------COMANDOS------------------");
    fs.readdirSync("./commands/").forEach((dir) => {        //lee el contenido del directorio que le pasamos en este commands y hace un for Each para cada directorio crea la constante commands
        const commands = fs
            .readdirSync(`./commands/${dir}`)                  //vuelve a leer el contenido esta vez en commands/dir es decir en todos los directorios hijos de commands
            .filter((file) => file.endsWith(".js"));            //filtra los que tengan la extension .js

        for (const file of commands) {                              //for of ejecuta el codigo para cada elemento iterable, en este caso cada file dentro de la constante commands creada anteriormente
            const cmd = require(`../commands/${dir}/${file}`);      //crea la constante cmd que requiere de la ruta entera del comando, proporcionda por el forEach
            if(cmd.name){                                           //si cmd tiene un nombre, osea existe,    
                console.log(`Comando cargado: ${cmd.name}`);        
                client.commands.set(cmd.name, cmd);                 //le pasa el nombre y el contenido del comando, que viene del module exports
            }else{
                console.log(`ERROR: ${cmd.name}`);
            }
        }

    });
    console.log("------------------COMANDOS------------------");
};