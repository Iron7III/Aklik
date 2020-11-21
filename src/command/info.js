//  npm Discord
const Discord = require("discord.js");
//  Usuario del Bot de Discord
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true
});
// {MessageEmbed}
const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args, Fortnite) => {
    console.log(client.uptime)
    let days = 0;
    let week = 0;
    let uptime = ``;
    let totalSeconds = (client.uptime / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    if(hours > 23){
        days = days + 1;
        hours = 0;
    }
    if(days == 7){
        days = 0;
        week = week + 1;
    }
    if(week > 0){   
        uptime += `${week} week, `;
    }
    if(minutes > 60){
        minutes = 0;
    }
    uptime += `${days} D, ${hours} H, ${minutes} M, ${seconds} S`;
    let Statistics=[
        `${client.emojis.cache.get("769568936077033482")} **UPTIME\n- **\`${uptime}\``,
        `${client.emojis.cache.get("768962558144938014")} **SERVERS\n- **\`${client.guilds.cache.size}\``,
        `**LENGUAJE\n- **\`Node.js\` ${client.emojis.cache.get("777182228987772958")}`,
        `${client.emojis.cache.get("768962690508783646")} **LIBRERIAS\n- **\`discord.js\` ${client.emojis.cache.get("777189460655341600")}\n**- **\`axios\` ${client.emojis.cache.get("777189460655341600")}\n**- **\`express\` ${client.emojis.cache.get("777189460655341600")}\n**- **\`fortnite-api-com\` ${client.emojis.cache.get("777189460655341600")}`,
    ];
    const embed = new Discord.MessageEmbed()
        .setTitle(`**${client.user.username} HELP**`)
        .addField(
            `**INFORMACIÓN**`,
            `${Statistics.join(`\n\n`)}`
        )
        .addField(
            `**ACTUALIZACIONES**`,
            `¡He sido añadido en [top.gg](https://top.gg/)!`
        )
    message.channel.send({ embed: embed })
}