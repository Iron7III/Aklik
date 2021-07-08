const Discord = require("discord.js");
const {assets} = require('../assets.json')

exports.run = async (client, message, args) => {
    let bulk = parseInt(args[0]);
    const embed = new Discord.MessageEmbed()
    if(!message.member.permissions.has('MANAGE_MESSAGES')){
        embed.setDescription(`_No tienes permisos suficientes._`).setColor('#ED4245')
        message.channel.send({embed: embed})
            .then(msg => client.setTimeout(() => msg.delete(), 5000))
    } else {
        if(isNaN(bulk)||!bulk){
            embed.setDescription(`_Escribe un número._`).setColor('#ED4245')
            message.channel.send({embed: embed})
                .then(msg => client.setTimeout(() => msg.delete(), 5000))
        } else {
            if(100<bulk||bulk<1){
                embed.setDescription(`_Ha de ser un número mayor a 0 y menor a 100._`)
                message.channel.send({embed: embed})
                    .then(msg => client.setTimeout(() => msg.delete(), 5000))
            } else {
                if(100>bulk&&bulk>0){
                    message.channel.bulkDelete(bulk, true)
                    embed.setDescription(`Se han borrado \`${bulk}\` mensajes.`).setColor('#57F287')
                    message.channel.send({embed: embed})
                        .then(msg => client.setTimeout(() => msg.delete(), 5000))
                } else {
                    embed.setDescription(`_No se han podido eliminar los mensajes._`).setColor('#ED4245')
                    message.channel.send({embed: embed})
                        .then(msg => client.setTimeout(() => msg.delete(), 5000))
                }
            }
        }
    }
}