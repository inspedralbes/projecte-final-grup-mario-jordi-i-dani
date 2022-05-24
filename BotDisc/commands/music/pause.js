const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");

const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
  name: "pause",
  description: "Pausar musica",
  async execute(client, message, args, discord) {
    const mvc = message.member.voice.channel.id;
    const pvc = getVoiceConnection(message.guild.id);

    if (!pvc) return message.reply("No se esta reproduciendo musica");  //si se intenta pausar sin estar reproduciendo nada, es decir el bot no esta en el canal de voz, manda un mensaje de error

    if (mvc != pvc.joinConfig.channelId) {
      return message.reply("Tienes que estar en el mismo canal de voz");  //si no estas en el mismo canal de voz que el bot que esta reproduciendo musica no te deja pararlo
    }

    const player = getVoiceConnection(message.guild.id).state.subscription.player;  //constante para el player de la musica

    player.pause();     //pausa el player
  },
};