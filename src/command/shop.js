const Discord = require("discord.js");

exports.run = async (client, message, args, FortniteAPIComClient, FortniteAPIIoClient, {assets}) => {
    /*try {
        message.channel.send({files: ['shop-cataba.webp']})
    } catch (e) {
        const embed = new Discord.MessageEmbed()
        embed.setAuthor(`I can't send the shop.`,assets.error).setColor('#ED4245')
        message.channel.send({embeds: [embed]})
            .then(msg => setTimeout(() => msg.delete(), 5000))
        console.error(e.stack);
        return
    }*/
    message.channel.send({content:'Currently unavalible'})
};
