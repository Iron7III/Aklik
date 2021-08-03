const Discord = require("discord.js");

exports.run = async (client, message, args, FortniteAPIComClient, FortniteAPIIoClient, {assets}) => {
    if(Discord.SnowflakeUtil.deconstruct(args[0]?args[0]:message.author.id).timestamp<=1420070400000){
        const InvalidSnowflakeUserId = new Discord.MessageEmbed()
            .setAuthor(`Write a valid ID.`,assets.error)
            .setColor('#ED4245')
        message.channel.send({embeds:[InvalidSnowflakeUserId]})
        return
    } else {
        
    }
}