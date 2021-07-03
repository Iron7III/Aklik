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
    intents: Discord.Intents.ALL
    //intents: Discord.Intents.NON_PRIVILEGED
});

exports.run = async (client, message, args) => {
    const guild = message.guild;
    //> **Registered ➜ **
    let _desc = [
        `> **AFK Channel | ID | Timeout➜ **\`${guild.afkChannel}\` | \`${guild.afkChannelID}\` | \`${guild.afkTimeout.getDate()>9?guild.afkTimeout.getDate():`0${guild.afkTimeout.getDate()}`}-${guild.afkTimeout.getMonth()>9?guild.afkTimeout.getMonth():`0${guild.afkTimeout.getMonth()+1}`}-${guild.afkTimeout.getFullYear()} | ${guild.afkTimeout.getHours()>9?guild.afkTimeout.getHours():`0${guild.afkTimeout.getHours()}`}:${guild.afkTimeout.getMinutes()>9?guild.afkTimeout.getMinutes():`0${guild.afkTimeout.getMinutes()}`}:${guild.afkTimeout.getSeconds()>9?guild.afkTimeout.getSeconds():`0${guild.afkTimeout.getSeconds()}`}\``
    ]
    const embed = new Discord.MessageEmbed()
        .setAuthor(`${guild.name}'s Information`,guild.icon({dynamic:true,size:512}))
        .setDescription(_desc.join('\n'))
    message.channel.send({embed: embed})
}