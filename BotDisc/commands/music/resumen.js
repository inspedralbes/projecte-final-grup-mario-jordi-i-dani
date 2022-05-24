const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");

const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {    //sirve para continuar reproduciendo la musica pausada
  name: "resumen",
  description: "Reproducir musica",
  async execute(client, message, args, discord) {
    const mvc = message.member.voice.channel.id;
    const pvc = getVoiceConnection(message.guild.id);
    if (!pvc) return message.reply("No se esta reproduciendo musica"); //comprueba que haya un reproductor conectado al canal de voz

    if (mvc != pvc.joinConfig.channelId)  //comprueba que reproductor y usuario esten en el mismo canal de voz
      return message.reply("Tienes que estar en el mismo canal de voz");

    const player = getVoiceConnection(message.guild.id).state.subscription.player;

    player.unpause();
  },
};