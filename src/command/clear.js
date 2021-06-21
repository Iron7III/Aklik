//  ⌚STATUS⌚
//  Comando 100% Completado y Funcional

const Discord = require("discord.js");
const client = new Discord.Client({
    disableEveryone: true,
    fetchAllMembers: true,
    ws: {
        properties: {
            $browser: "Discord Android"
        },
    },
    intents: Discord.Intents.ALL
    //intents: Discord.Intents.NON_PRIVILEGED
});

exports.run = async (client, message, args) => {
    let bulk = args[0];
    const embed = new Discord.MessageEmbed()
    if(!message.member.hasPermission('MANAGE_MESSAGES')){
        embed.setDescription(`_No tienes permisos suficientes._`).setColor('#ED4245')
        message.channel.send({embed: embed})
            .then(m => m.delete({ timeout: 5000 }))
    } else {
        if(isNaN(bulk)||!bulk){
            embed.setDescription(`_Escribe un número._`).setColor('#ED4245')
            message.channel.send({embed: embed})
                .then(m => m.delete({ timeout: 5000 }))
        } else {
            if(100<bulk<1){
                embed.setDescription(`_Ha de ser un número mayor a 0 y menor a 100._`)
                message.channel.send({embed: embed})
                    .then(m => m.delete({ timeout: 5000 }))
            } else {
                if(100>bulk>0){
                    message.channel.bulkDelete(bulk, true)
                    embed.setDescription(`Se han borrado \`${bulk}\` mensajes.`).setColor('#57F287')
                    message.channel.send({embed: embed})
                        .then(m => m.delete({ timeout: 10000 }))
                } else {
                    embed.setDescription(`_No se han podido eliminar los mensajes._`).setColor('#ED4245')
                    message.channel.send({embed: embed})
                        .then(m => m.delete({ timeout: 10000 }))
                }
            }
        }
    }
}