//  npm Discord
const Discord = require("discord.js");
//  Usuario del Bot de Discord
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true
});

exports.run = async (client, message, args) => {
        const Island = new Discord.MessageEmbed()
            .setTitle(args[0])
            .setImage(`http://fortnite-island-screenshots-live-cdn.ol.epicgames.com/screenshots/${args[0]}_${args[1]}.png`)
            .setColor("#bdecb6");
        message.channel.send({embed: Island})
};