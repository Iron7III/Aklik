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
    uptime += `${days} D, ${hours>9?hours:`0${hours}`}:${minutes>9?minutes:`0${minutes}`}:${seconds>9?seconds:`0${seconds}`}`;
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
                `\`${client.guilds.cache.size.toLocaleString()}\` **|** \`${client.users.cache.size.toLocaleString()}\``
            ]
        },
        "idioms":{
            "header":`**LENGUAJES**`,
            "list":[
                `\`Node.js\` ${client.emojis.cache.get("777182228987772958")}`,
                `\`Git\` ${client.emojis.cache.get("832355210885464066")}`
            ]
        },
        "dependices":{
            "header":`${client.emojis.cache.get("768962690508783646")} **LIBRERIAS**`,
            "list":[
                `\`discord.js v13.0.0-dev\` ${client.emojis.cache.get("777189460655341600")}`,
                `\`axios v0.21.0\`${client.emojis.cache.get("777189460655341600")}`,
                `\`express v4.17.1\`${client.emojis.cache.get("777189460655341600")}`,
                `\`fortnite-api-com v2.2.1\` ${client.emojis.cache.get("777189460655341600")}`
            ]
        },
        "links":{
            "header":`**LINKS**`,
            "list":[
                `[**top.gg**](https://top.gg/bot/685919845233197100) ${client.emojis.cache.get("780150734779056170")}`,
                `[**VOTAME**](https://top.gg/bot/685919845233197100/vote) ${client.emojis.cache.get("780150734779056170")}`,
                `[**INVITAME**](https://discord.com/oauth2/authorize?client_id=685919845233197100&permissions=8&scope=bot) ${client.emojis.cache.get("780150734779056170")}`
            ]
        }
    }
    let Statistics=[
        [Stats.uptime.header,Stats.uptime.list.map(l=>`- ${l}`).join('\n')].join('\n'),
        [Stats.idioms.header,Stats.idioms.list.map(l=>`- ${l}`).join('\n')].join('\n'),
        [Stats.servers.header,Stats.servers.list.map(l=>`- ${l}`).join('\n')].join('\n'),
        [Stats.dependices.header,Stats.dependices.list.map(l=>`- ${l}`).join('\n')].join('\n'),
        [Stats.links.header,Stats.links.list.map(l=>`- ${l}`).join('\n')].join('\n')
    ];
    const embed = new Discord.MessageEmbed()
        .setTitle(`**INFORMACION DE ${client.user.username}**`)
        .setDescription('Soy un BOT en constante desarrollo, tengo algunas funciones sobre Fortnite y mi principal funcion es la Moderacion, aunque tenga pocos comandos soy actualizado constantemente con fixes y mejoras, no te pierdas ninguna y disfruta de todas mis funciones :)')
        .addField(
            `**INFORMACIÓN**`,
            `${Statistics.join(`\n\n`)}`
        )
        .addField(
            `**ACTUALIZACIONES**`,
            `¡He sido añadido en [top.gg](https://top.gg/bot/685919845233197100)!\n¡En proceso de verificacion! [Invitame](https://discord.com/oauth2/authorize?client_id=685919845233197100&permissions=4294967287&scope=bot) para apoyarme.`
        )
        .setColor('#FF6B00')
    //message.channel.send({ embed: embed })
    client.api.channels(message.channel.id).messages.post({
        type: 1,
        data: {
            content: ' ',
            embed: embed,
            components: [
                {
                    type: 1,
                    components: [
                        {
                            type: 2,
                            label: 'Top.gg',
                            style: 5,
                            url: 'https://top.gg/bot/685919845233197100'
                        }
                    ],
                    type: 1,
                    components: [
                        {
                            type: 2,
                            label: 'Invitame',
                            style: 5,
                            url: 'https://discord.com/oauth2/authorize?client_id=685919845233197100&permissions=4294967287&scope=bot'
                        }
                    ]
                }
            ]
        }
    })
}