module.exports =  {
    name: 'clear',
    aliases: ['del', 'borrar', 'limpiar'],
    description: 'Borra un máximo de 100 mensajes utilizando !clear, !del, !borrar o !limpiar',

    async execute(client,message,args,discord) {
        if(!args[0]) return message.reply("Introduce cuantos mensajes quieres borrar");
        if(isNaN(args[0])) return message.reply("Debes introducir un número");
        if(args[0] > 100) return message.reply("Debes introducir un número menor a 100");
        if(args[0] < 1) return message.reply("Debes introducir un número mayor a 0");

        await message.channel.messages
        .fetch({limit: args[0]})
        .then((messages) => {
            message.channel.bulkDelete(messages);
        });
    },
};