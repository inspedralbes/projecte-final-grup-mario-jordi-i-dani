//Dependencias
const Discord = require("discord.js");
const fetch = require("node-fetch");
const preguntas = require("./preguntas.json");
require("dotenv").config();
const mongoose = require('mongoose');
const User = require('./schemas/UserSchema');
const mdb = process.env.MONGODB_URI;

mongoose
    .connect(mdb, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((m)=>{
        console.log("Connected to DB");
        console.log("--------- LOGS DEL BOT -----------");
    }).catch((err)=> console.log(err));

// mongoose
//     .connect("mongodb+srv://a20jorcatace:Institut124@cluster1.gkwwj.mongodb.net/preguntaBot?retryWrites=true&w=majority", {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(()=>{
//         console.log("Connected to DB");
//     })
//     .catch((e)=>{

//      console.log(e);
//     });





//Para poder mandar imagenes
const { MessageEmbed } = require('discord.js');


//Creamos un Discord.Client nuevo, y le damos la opcion de recibir mensajes del servidor
const client = new Discord.Client({
    intents: ['GUILD_VOICE_STATES', 'GUILD_MESSAGES', 'GUILDS', 'GUILD_MESSAGE_REACTIONS']
});

//Prefijo para el bot
const prefix = "!";

const imagenes = ["https://www.geekmi.news/__export/1644190196029/sites/debate/img/2022/02/06/zenitsu4.jpg_976912859.jpg","https://esports.as.com/2019/08/22/league-of-legends/tacticas-maestras--tft/Aatrox-Buff_1275182479_245676_1440x810.jpg", "https://areajugones.sport.es/wp-content/uploads/2021/05/imagen-2021-05-22-135309.jpg"]

const jugadores = []; 

//El metodo .on, hace que discord nos envie una notificacion sobre los eventos nuevos, recibe 2 parametros
//el nombre del evento, y la funcion a realizar cuando pasa dicho evento
client.on("messageCreate", async function(message) { 

    //Aqui comprueba si el mensaje es de un bot o no, si es de un bot, para el processo
    if (message.author.bot) return;

    //Aqui comprueba si el principio del mensaje empieza con el prefijo que has definido antes (!), si no para el processo
    if (!message.content.startsWith(prefix)) return;

    //Aqui elimina el prefijo y lo mete en la constante commandBody, usando slice, esto es porque no nos interesa meter el prefijo en lo que parseamos
    const commandBody = message.content.slice(prefix.length);

    //Aqui a partir de la constante commandBody, separa el string en substrings en una array , con un espacio como separacion
    const args = commandBody.split(' ');

    //Aqui con shift, borramos el primer elemento de la array anterior, ya que es el nombre del comando, y nosotros solo queremos el argumento
    //despues con toLowerCase, lo pasamos a minusculas, ya que los comandos de los bots no son sensible a las caps
    const command = args.shift().toLowerCase();

    
    
    //Comprobamos si la constante command coincide con el valor ping, si coincide procede a ejecutar el codigo.
    if (command === "ping") {

       
      const i = Math.floor(Math.random() * 3);
      const nombre = preguntas.preguntas[i].pregunta;
      const array = preguntas.preguntas[i].respuestas;

      let shuffled = array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)

        //fetch prueba
        const response = await fetch("https://opentdb.com/api.php?amount=2&category=17&difficulty=easy&type=boolean");
        const data = await response.json();
      
        const respuestaCorrecta = preguntas.preguntas[i].respuestaCorrecta;
        const respuesta1 = shuffled[0];
        const respuesta2 = shuffled[1];
        const respuesta3 = shuffled[2];
        const respuesta4 = shuffled[3];
        console.log(preguntas.preguntas)
        //console.log(nombre)
        console.log(data)
        //console.log(data.results[0].incorrect_answers)

        const exampleEmbed = new MessageEmbed()
                .setColor('#0099ff') 
                .addFields(
                    { name: "Pregunta", value: `${nombre}` },
                    { name: '\u200B', value: '\u200B' },
                    { name: ' Respuesta 1️⃣', value: `${respuesta1}`, inline: true },
                    { name: 'Respuesta 2️⃣', value: `${respuesta2}`, inline: true },
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Respuesta 3️⃣', value: `${respuesta3}`, inline: true },
                    { name: 'Respuesta 4️⃣', value: `${respuesta4}`, inline: true },
                )
                //.addField('Inline field title', 'Some value here', true)
                .setImage(imagenes[Math.floor(Math.random() * imagenes.length)])

                const sentEmbed = await message.channel.send({ embeds: [exampleEmbed] });
                sentEmbed.react('1️⃣');
                sentEmbed.react('2️⃣');
                sentEmbed.react('3️⃣');
                sentEmbed.react('4️⃣');


            const filter = (reaction, user) => {
             return (reaction.emoji.name === '1️⃣' || reaction.emoji.name === '2️⃣'  || reaction.emoji.name === '3️⃣'  || reaction.emoji.name === '4️⃣') && !user.bot;
        };
        const collector = sentEmbed.createReactionCollector({filter, max: 1,  time: 30000 });
        collector.on('collect', (reaction, user) => {

            switch(reaction.emoji.name){
                
                case '1️⃣':
                    if(respuesta1 === respuestaCorrecta){
                        message.channel.send(`Respuesta 1 CORRECTA Collected ${reaction.emoji.name} from ${user.tag}`);
                        jugadores.push(user.tag);
                        jugadores.forEach(element => {
                            message.channel.send(element);
                        });
                        
                    }else{
                        message.channel.send(`Respuesta 1 INCORRECTA Collected ${reaction.emoji.name} from ${user.tag} `)
                    }
                    
                    break;
                case '2️⃣':
                    if(respuesta2 === respuestaCorrecta){
                        message.channel.send(`Respuesta 2 CORRECTA Collected ${reaction.emoji.name} from ${user.tag} `)
                        jugadores.push(user.tag);
                        jugadores.forEach(element => {
                            message.channel.send(element);
                        });
                    }else{
                        message.channel.send(`Respuesta 2 INCORRECTA Collected ${reaction.emoji.name} from ${user.tag} `)
                    }
                    break;
                case '3️⃣':
                    if(respuesta3 === respuestaCorrecta){
                        message.channel.send(`Respuesta 3 CORRECTA Collected ${reaction.emoji.name} from ${user.tag} `)
                        jugadores.push(user.tag);
                        jugadores.forEach(element => {
                            message.channel.send(element);
                        });
                    }else{
                        message.channel.send(`Respuesta 3 INCORRECTA Collected ${reaction.emoji.name} from ${user.tag} `)
                    }
                    break;
                case '4️⃣':
                    if(respuesta4 === respuestaCorrecta){
                        message.channel.send(`Respuesta 4 CORRECTA Collected ${reaction.emoji.name} from ${user.tag} `)
                        jugadores.push(user.tag);
                        jugadores.forEach(element => {
                            message.channel.send(element);
                        });
                    }else{
                        message.channel.send(`Respuesta 4 INCORRECTA Collected ${reaction.emoji.name} from ${user.tag}`)
                    }
                    break;
            }

        });

        collector.on('end', collected => {
            message.channel.send(`Collected ${collected.size} items`);
        });

        //Aqui a partir de la fecha actual y cuando se creo el mensaje, calculamos lo que tarda en mandar el bot su mensaje en milisegundos
        //const timeTaken = message.createdTimestamp - sentEmbed.createdTimestamp;
        
        //Con el metodo reply, responde al usuario que haya escrito el comando
        //message.channel.send(`Pong! This message had a latency of ${timeTaken}ms.`);

    }  

});

client.on('messageCreate', async (message) => {
    const newUser = await User.create({
        username: message.author.username,
        discordId: message.author.id
    });
});

client.login(process.env.DISCORD_BOT_TOKEN);