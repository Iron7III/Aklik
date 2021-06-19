//  ⌚STATUS⌚
//  Comando no funcional debido a la falta de Privileged Intents
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

exports.run = async (client, message, args) => {
    const UserInfoEmbed = new Discord.MessageEmbed()

    message.channel.send('El comando no funciona, disculpa las molestias :(')
}