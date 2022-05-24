const mongoose = require('mongoose');


module.exports = {
    name: "lol",
    description: "el lol",
    async execute (client, message, args, discord){
        const i = Math.floor(Math.random() * 3);
    // const nombre = preguntas.preguntas[i].pregunta;
    // const array = preguntas.preguntas[i].respuestas;

    preguntas = await preguntasSchema.find();
    console.log(preguntas);

    let shuffled = array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

    
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
          message.channel.send(`${message.createdTimestamp}`)
      });
    }

}







