//  npm Discord
const Discord = require("discord.js");
//  Usuario del Bot de Discord
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true
});

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
    let Stats={
        "uptime":{
            "header":`${client.emojis.cache.get("769568936077033482")} **UPTIME**`,
            "list":[
                `\`${uptime}\``
            ]
        },
        "servers":{
            "header":`${client.emojis.cache.get("768962558144938014")} **SERVIDORES | USUARIOS**`,
            "list":[
                `\`${client.guilds.cache.size}\` **|** \`${client.users.cache.size}\``
            ]
        },
        "idioms":{
            "header":`**LENGUAJE**`,
            "list":[
                `\`Node.js\` ${client.emojis.cache.get("777182228987772958")}`
            ]
        },
        "dependices":{
            "header":`${client.emojis.cache.get("768962690508783646")} **LIBRERIAS**`,
            "list":[
                `\`discord.js\` ${client.emojis.cache.get("777189460655341600")}`,
                `\`axios\` ${client.emojis.cache.get("777189460655341600")}`,
                `\`express\` ${client.emojis.cache.get("777189460655341600")}`,
                `\`fortnite-api-com\` ${client.emojis.cache.get("777189460655341600")}`
            ]
        },
        "links":{
            "header":`**LINKS**`,
            "list":[
                `\`top.gg\` [${client.emojis.cache.get("780150734779056170")}](https://top.gg/bot/685919845233197100)`,
                `\`VOTAME\` [${client.emojis.cache.get("780150734779056170")}](https://top.gg/bot/685919845233197100/vote)`,
                `\`INVITAME\` [${client.emojis.cache.get("780150734779056170")}](https://discord.com/oauth2/authorize?client_id=685919845233197100&permissions=8&scope=bot)`
            ]
        }
    }
    let Statistics=[
        [Stats.uptime.header,Stats.uptime.list.map(l=>`- ${l}`).join('\n')].join('\n'),
        [Stats.servers.header,Stats.servers.list.map(l=>`- ${l}`).join('\n')].join('\n'),
        [Stats.idioms.header,Stats.idioms.list.map(l=>`- ${l}`).join('\n')].join('\n'),
        [Stats.dependices.header,Stats.dependices.list.map(l=>`- ${l}`).join('\n')].join('\n'),
        [Stats.links.header,Stats.links.list.map(l=>`- ${l}`).join('\n')].join('\n')
    ];
    const embed = new Discord.MessageEmbed()
        .setTitle(`**${client.user.username} HELP**`)
        .addField(
            `**INFORMACIÓN**`,
            `${Statistics.join(`\n\n`)}`
        )
        .addField(
            `**ACTUALIZACIONES**`,
            `¡He sido añadido en [top.gg](https://top.gg/bot/685919845233197100)!`
        )
        .setColor('#FF6B00')
    message.channel.send({ embed: embed })
}