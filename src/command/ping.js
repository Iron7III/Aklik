const Discord = require("discord.js");

exports.run = async (client, message, args, FortniteAPIComClient, FortniteAPIIoClient, {assets}) => {
    const PingEmbed = new Discord.MessageEmbed()
        .setDescription(`Ping...`)
        .setColor("#FD3D26");
    const m = await message.channel.send({embeds: [PingEmbed]});
    const FinalPingEmbed = new Discord.MessageEmbed()
        .setDescription(`**Ping: \`${Date.now()-m.createdTimestamp}\`ms | \`${Math.round(client.ws.ping)}\`ms**`)
        .setColor("#FD3D26");
    m.edit({embeds: [FinalPingEmbed]});
};