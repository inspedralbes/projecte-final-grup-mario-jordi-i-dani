module.exports = {
    name:"ping",
    descripcion:"tiempo de respuesta",
    async execute(client,message,args,discord){
        message.channel.send("!PONG");
    },
};