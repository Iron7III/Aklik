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
    console.log(guild.bans)
    var date = new Date(guild.afkTimeout*1000)
    //> **Registered ➜ **
    let _desc = [
        `> **Name ➜ **\`${guild.name}\``,
        `> **ID ➜ **\`${guild.id}\``,
        `> **Members ➜ **\`${guild.memberCount}\``,
        `> **Owner ➜ **<@${guild.ownerID}> ${client.emojis.cache.get('860997112434786315')} ${message.channel.guild.members.cache.get(guild.ownerID).premiumSince!=null?client.emojis.cache.get('860999928217206795'):` `} **|** \`${guild.ownerID}\``,
        `> **Maximum Members ➜ **\`${guild.maximumMembers}\``,
        `> **Maximum Presences ➜ **\`${guild.maximumPresences}\``,
        `> **Created ➜ **\` \``
    ]
    if(guild.afkChannel){
        _desc.splice(_desc.length,0,`> **AFK Channel ➜ **${guild.afkChannel} **|** \`${guild.afkChannelID}\` **|** \`${date.getHours()>9?date.getHours():`0${date.getHours()}`}:${date.getMinutes()>9?date.getMinutes():`0${date.getMinutes()}`}:${date.getSeconds()>9?date.getSeconds():`0${date.getSeconds()}`}\``)
    }
    if(guild.rulesChannel){
        _desc.splice(_desc.length,0,`> **Rules Channel ➜ **${guild.rulesChannel} **|** \`${guild.rulesChannelID}\``)
    }
    if(guild.systemChannel){
        _desc.splice(6,0,`> **System Channel ➜ **${guild.systemChannel} **|** \`${guild.systemChannelID}\``)
    }
    const embed = new Discord.MessageEmbed()
        .setAuthor(`${guild.name}'s Information`,guild.iconURL({dynamic:true,size:512}))
        .setDescription(_desc.join('\n'))
        .setColor('#FEE75C')
        .setThumbnail(guild.iconURL({dynamic:true,size:512}))
    message.channel.send({embed: embed})
}