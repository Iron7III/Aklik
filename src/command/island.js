const Discord = require("discord.js");

exports.run = async (client, message, args, FortniteAPIComClient, FortniteAPIIoClient, {assets}) => {
        const Island = new Discord.MessageEmbed()
            .setTitle(args[0])
            .setImage(`http://fortnite-island-screenshots-live-cdn.ol.epicgames.com/screenshots/${args[0]}_${args[1]}.png`)
            .setColor("#bdecb6");
        message.channel.send({embed: Island})
};