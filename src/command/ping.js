const Discord = require("discord.js");
const {assets} = require('../assets.json')

exports.run = async (client, message, args, Fortnite) => {
    const PingEmbed = new Discord.MessageEmbed()
        .setDescription(`Ping...`)
        .setColor("#57F287");
    const m = await message.channel.send({embed: PingEmbed});
    const FinalPingEmbed = new Discord.MessageEmbed()
        .setDescription(`**Ping: \`${Date.now()-m.createdTimestamp}\`ms | \`${Math.round(client.ws.ping)}\`ms**`)
        .setColor("#57F287");
    m.edit({embed: FinalPingEmbed});
};