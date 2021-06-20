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
            "header":`**UPTIME**`,
            "list":[
                `\`${uptime}\``
            ]
        },
        "servers":{
            "header":`**SERVIDORES | USUARIOS**`,
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
            "header":`**LIBRERIAS**`,
            "list":[
                `\`discord.js v13.0.0-dev\` ${client.emojis.cache.get("777189460655341600")}`,
                `\`axios v0.21.0\`${client.emojis.cache.get("777189460655341600")}`,
                `\`express v4.17.1\`${client.emojis.cache.get("777189460655341600")}`,
                `\`fortnite-api-com v2.2.1\` ${client.emojis.cache.get("777189460655341600")}`
            ]
        }
    }
    let Statistics=[
        [Stats.uptime.header,Stats.uptime.list.map(l=>`- ${l}`).join('\n')].join('\n'),
        [Stats.idioms.header,Stats.idioms.list.map(l=>`- ${l}`).join('\n')].join('\n'),
        [Stats.servers.header,Stats.servers.list.map(l=>`- ${l}`).join('\n')].join('\n'),
        [Stats.dependices.header,Stats.dependices.list.map(l=>`- ${l}`).join('\n')].join('\n')
    ];
    const embed = new Discord.MessageEmbed()
        .setTitle(`**INFORMACION DE ${client.user.username}**`)
        .setDescription('Soy un BOT en constante desarrollo, tengo algunas funciones sobre Fortnite y mi principal funcion es la Moderacion, aunque tenga pocos comandos soy actualizado constantemente con fixes y mejoras, no te pierdas ninguna y disfruta de todas mis funciones :)')
        .addField(Stats.uptime.header,Stats.uptime.list.map(l=>`- ${l}`).join('\n'),true)
        .addField(Stats.idioms.header,Stats.idioms.list.map(l=>`- ${l}`).join('\n'),true)
        .addField(Stats.servers.header,Stats.servers.list.map(l=>`- ${l}`).join('\n'),true)
        .addField(Stats.dependices.header,Stats.dependices.list.map(l=>`- ${l}`).join('\n'),true)
        .addField(`**ACTUALIZACIONES**`,`¡He sido añadido a [top.gg](https://top.gg/bot/685919845233197100)!\n¡En busca de los Intents perdidos...!`)
        .setColor('#FF6B00')
    const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
                .setLabel('Top.gg')
                .setStyle('LINK')
                .setEmoji(client.emojis.cache.get("851166313372319816"))
                .setURL('https://top.gg/bot/685919845233197100'),
            new Discord.MessageButton()
                .setLabel('Votar')
                .setStyle('LINK')
                .setEmoji(client.emojis.cache.get("851169432113512477"))
                .setURL('https://top.gg/bot/685919845233197100/vote'),
            new Discord.MessageButton()
                .setLabel('Invitame')
                .setStyle('LINK')
                .setEmoji(client.emojis.cache.get('851173104838377502'))
                .setURL('https://discord.com/oauth2/authorize?client_id=685919845233197100&permissions=4294967287&scope=bot'),
            new Discord.MessageButton()
                .setLabel('GitHub')
                .setStyle('LINK')
                .setEmoji(client.emojis.cache.get('856179417902350386'))
                .setURL('https://github.com/Iron7III/Aklik')
                .setDisabled(true)
        )
    client.api.channels(message.channel.id).messages.post({
        type: 1,
        data: {
            content: ' ',
            embed: embed,
            components: [
                row
            ]
        }
    })
}