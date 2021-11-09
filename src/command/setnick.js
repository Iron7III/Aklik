const Discord = require("discord.js");

exports.run = async (client, message, args, FortniteAPIComClient, FortniteAPIIoClient, {assets}) => {
    if(!message.member.permissions.has('MANAGE_NICKNAMES')){
        const NoPermissions = new Discord.MessageEmbed()
            .setAuthor(`You need Manage Nicknames permission.`,assets.error)
            .setColor('#ED4245')
        message.channel.send({embeds: [NoPermissions]})
            .then(msg => client.setTimeout(() => msg.delete(), 5000))
    } else {
        if(Discord.SnowflakeUtil.deconstruct(args[0]?args[0]:message.author.id).timestamp<=1420070400000){
            const InvalidSnowflakeUserId = new Discord.MessageEmbed()
                .setAuthor(`Write a valid ID.`,assets.error)
                .setColor('#ED4245')
            message.channel.send({embeds:[InvalidSnowflakeUserId]})
            return
        } else {
            
        }
    }
}