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

exports.run = async (client, message, args, Fortnite) => {
    const test = new Discord.MessageEmbed()
      .setTitle('awdaw')
      .setColor('RANDOM')
    message.channel.send({files: ['shop-cataba.jpg'],embed: test})
};
