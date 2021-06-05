const Discord = require("discord.js");
const client = new Discord.Client({
    disableEveryone: true,
    fetchAllMembers: true,
    ws: {
        properties: {
            $browser: "Discord Android"
        },
    },
    intents: Discord.Intents.NON_PRIVILEGED
});

exports.run = async (client, message, args, Fortnite) => {
    const PingEmbed = new Discord.MessageEmbed()
        .setDescription(`Ping...`)
        .setColor("#57F287");
    const m = await message.channel.send({embed: PingEmbed});
    const FinalPingEmbed = new Discord.MessageEmbed()
        .setDescription(`**Ping: \`${m.createdTimestamp-message.createdTimestamp}\`ms | \`${Math.round(client.ws.ping)}\`ms**`)
        .setColor("#57F287");
    m.edit({embed: FinalPingEmbed});
};