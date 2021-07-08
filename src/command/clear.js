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
            embed.setAuthor('Write a number.',assets.number).setColor('#ED4245')
            message.channel.send({embed: embed})
                .then(msg => client.setTimeout(() => msg.delete(), 5000))
        } else {
            if(100<bulk||bulk<1){
                embed.setAuthor('It must be a number bigger than 0 and less than 100.',assets.number).setColor('#ED4245')
                message.channel.send({embed: embed})
                    .then(msg => client.setTimeout(() => msg.delete(), 5000))
            } else {
                if(100>bulk&&bulk>0){
                    message.channel.bulkDelete(bulk+1, true)
                    embed.setAuthor(`Deleted ${bulk} messages.`,assets.success).setColor('#57F287')
                    message.channel.send({embed: embed})
                        .then(msg => client.setTimeout(() => msg.delete(), 5000))
                } else {
                    embed.setAuthor(`I couldn't delete the messages.`,assets.error).setColor('#ED4245')
                    message.channel.send({embed: embed})
                        .then(msg => client.setTimeout(() => msg.delete(), 5000))
                }
            }
        }
    }
}