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
    console.log(guild)
    //> **Registered ➜ **
    let _desc = [
        `> **Owner ➜ **<@${guild.ownerID}> | ${guild.ownerID}`,
        `> **Maximum Members ➜ **\`${guild.maximumMembers}\``,
        `> **Maximum Presences ➜ **\`${guild.maximumPresences}\``,
        `> **AFK Channel ➜ **\`${guild.afkChannel}\` | \`${guild.afkChannelID}\` | \`${(guild.afkTimeout*1000).getDate()>9?(guild.afkTimeout*1000).getDate():`0${(guild.afkTimeout*1000).getDate()}`}-${(guild.afkTimeout*1000).getMonth()>9?(guild.afkTimeout*1000).getMonth():`0${(guild.afkTimeout*1000).getMonth()+1}`}-${(guild.afkTimeout*1000).getFullYear()} | ${(guild.afkTimeout*1000).getHours()>9?(guild.afkTimeout*1000).getHours():`0${(guild.afkTimeout*1000).getHours()}`}:${(guild.afkTimeout*1000).getMinutes()>9?(guild.afkTimeout*1000).getMinutes():`0${(guild.afkTimeout*1000).getMinutes()}`}:${(guild.afkTimeout*1000).getSeconds()>9?(guild.afkTimeout*1000).getSeconds():`0${(guild.afkTimeout*1000).getSeconds()}`}\``
    ]
    const embed = new Discord.MessageEmbed()
        .setAuthor(`${guild.name}'s Information`,guild.iconURL({dynamic:true,size:512}))
        .setDescription(_desc.join('\n'))
        .setThumbnail(guild.iconURL({dynamic:true,size:512}))
    message.channel.send({embed: embed})
}