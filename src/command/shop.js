const Discord = require("discord.js");

exports.run = async (client, message, args, Fortnite) => {
    message.channel.send({files: ['shop-cataba.webp']})
        .catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setAuthor(`I can't unban this user.`,assets.error).setColor('#ED4245')
            message.channel.send({embed: embed})
                .then(msg => client.setTimeout(() => msg.delete(), 5000))
            console.error(err);
        })
};
