//esta en pruebas, es algo que implementaré cuando sepa como




//distube.js en handlers no va a ver aQUI
const {DisTube} = require('distube');
const {SpotifyPlugin} = require('@distube/spotify');
const {SoundCloudPlugin} = require('@distube/soundcloud');
const { SpotifyAlbum } = require('play-dl');
module.exports = (client, discord) => {
    client.distube = new DisTube(client , {
        emitNewSongOnly: false,
        leaveOnEmpty: true,
        leaveOnFinish:true,
        leaveOnStop:true,
        savePreviousSongs:true,
        emitAddSongWhenCreatingQueue: false,
        searchSongs:0,
        nsfw: false,
        emptyCooldown: 25,
        ytdlOptions: {
            highWaterMark: 1024 * 1024 * 64,
            quality:"highestaudio",
            format:"audioonly",
            liveBuffer:60000,
            dlChunkSize: 1024 * 1024 * 4,
        },
        youtubeDL: false,
        plugins:[
            new SpotifyPlugin({
                parallel: true,
                emitEventsAfterFetching: true,
            }),
            new SoundCloudPlugin()
        ],
    });


    client.distube.on("playSong", (queue,song) => {
        queue.textChannel.send(`**Reproduciendo ${song.name} - \`${song.formattedDuration}\`**`)
    });
    client.distube.on("addSong", (queue,song) => {
        queue.textChannel.send(`**Añadido a la cola ${song.name} - \`${song.formattedDuration}\`**`)
    });
};
//aqui acaba


module.exports = {
    name: "spoti",
    aliases: ["lista"],
    description: "sirve para escuchar listas de spotify",
    async execute (client, message, args, discord) {
        if (!args.length) return message.reply(`Tienes que especificar el nombre de una canción`);
        if (!message.member.voice?.channel) return message.reply(`Tienes que estar en un canal de voz`);
        client.distube.play(message.member.voice?.channel, args.join(" "), {
            member: message.member,
            textChannel: message.channel,
            message
        });
        message.reply(`**Buscando \`${args.join(" ")}\`...`);
    }
}