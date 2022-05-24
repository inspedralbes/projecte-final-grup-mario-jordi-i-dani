const play = require("play-dl");

const {
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} = require("@discordjs/voice");  //desestructuracion del modulo

module.exports = {
  name: "play",
  description: "Reproducir musica",
  async execute(client, message, args, discord) {
    //# Canal de voz
    let vc = message.member.voice.channel;
    //# Comprobaciones
    if (args.length < 1) {
      return message.channel.send("Tienes que indicar el nombre de la cancion");  //si no pones un nombre de una cancion u artista despues del comando da error
    }

    if (!vc) {
      return message.channel.send("Tienes que estar en un canal de voz"); //si no estas en un canal de voz da error
    }

    let ytInfo = await play.search(args.join(" "));   //manda los argumentos al modulo
    let stream = await play.stream(ytInfo[0].url);    //recoge datos de lo que se ha buscado
    console.log(ytInfo[0])

    const embed = {   //mensaje embed para cuando encuentra la cancion buscada que muestra el titul y la descripcion de YT 
      author: {
        name: "GrefuMusic",
        icon_url:
          "https://png.pngtree.com/png-vector/20190830/ourlarge/pngtree-music-icon-design-vector-png-image_1714137.jpg",
      },
      title: ytInfo[0].title,
      description: `${ytInfo[0].description}\n**[LINK](${ytInfo[0].url})**`,
      color: "GOLD",

    };

    const connection = joinVoiceChannel({   //conexion al canal de voz
      channelId: vc.id,
      guildId: message.guildId,
      adapterCreator: message.guild.voiceAdapterCreator,
    });

    const resource = createAudioResource(stream.stream, { //crea el resource del audio, de cualquier tipo, no necesariamente opus por el paquete @discord/opus sino del tipo del stream, es decir, lo que venga
      inputType: stream.type,
    });
    const player = createAudioPlayer();   //crea el reproductor
    player.play(resource);
    connection.subscribe(player);

    message.reply({ embeds: [embed] });
    player.on("error", (error) => {
      console.error(
        `Error: ${error.message} with resource ${error.resource.metadata.title}`
      );
      player.play(getNextResource()); //coge lo siguiente que le envies para que reproduzca
    });
  },
};