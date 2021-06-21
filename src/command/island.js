const Discord = require("discord.js");
const client = new Discord.Client({
    disableEveryone: true,
    fetchAllMembers: true,
    ws: {
        properties: {
            $browser: "Discord Android"
        },
    },
    intents: Discord.Intents.ALL
    //intents: Discord.Intents.NON_PRIVILEGED
});

exports.run = async (client, message, args) => {
        const Island = new Discord.MessageEmbed()
            .setTitle(args[0])
            .setImage(`http://fortnite-island-screenshots-live-cdn.ol.epicgames.com/screenshots/${args[0]}_${args[1]}.png`)
            .setColor("#bdecb6");
        message.channel.send({embed: Island})
};