const Discord = require("discord.js");

exports.run = async (client, message, args, FortniteAPIComClient, FortniteAPIIoClient, {assets}) => {
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
    uptime += `${days} Days, ${hours>9?hours:`0${hours}`}:${minutes>9?minutes:`0${minutes}`}:${seconds>9?seconds:`0${seconds}`}`;
    let Data = [
        {
            header: `Stats`,
            inline: true,
            list: [
                `> **Uptime ➜ **\`${uptime}\``,
                `> **Guilds ➜ **\`${client.guilds.cache.size.toLocaleString()}\``,
                `> **Users ➜ **\`${client.users.cache.size.toLocaleString()}\``,
                `> **Channels ➜ **\`${client.channels.cache.size.toLocaleString()}\``,
                `> **Emojis ➜ **\`${client.emojis.cache.size.toLocaleString()}\``
            ]
        },
        {
            header: `Languages`,
            inline: true,
            list: [
                `> **Node.js** ${client.emojis.cache.get("777182228987772958")}`,
                `> **Git** ${client.emojis.cache.get("832355210885464066")}`
            ]
        },
        {
            header: `Dependencies`,
            inline: false,
            list: [
                `> **discord.js ➜ **\`v13.0.1\` ${client.emojis.cache.get("777189460655341600")}`,
                `> **axios ➜ **\`v0.21.0\` ${client.emojis.cache.get("777189460655341600")}`,
                `> **canvas ➜ **\`v2.6.1\` ${client.emojis.cache.get("777189460655341600")}`,
                `> **fortnite-api-com ➜ **\`v2.2.1\` ${client.emojis.cache.get("777189460655341600")}`,
                `> **fortnite-api-io ➜ **\`v1.9.0\` ${client.emojis.cache.get("777189460655341600")}`
            ]
        },
        {
            header: `Announcements`,
            inline: false,
            list: [
                `➜ ¡I have been added to [top.gg](https://top.gg/bot/${client.user.id})!`
            ]
        }
    ]
    const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username}'s Information`,client.user.displayAvatarURL({dynamic:true,size:512}))
        .setDescription('Im a Discord BOT for moderation and other some uses.')
        .setColor('#FD3D26')
    Data.map(o => embed.addField(o.header,o.list.join('\n'),o.inline))
    const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
                .setLabel('Top.gg')
                .setStyle('LINK')
                .setEmoji(client.emojis.cache.get("871896526820085760"))
                .setURL(`https://top.gg/bot/${client.user.id}`),
            new Discord.MessageButton()
                .setLabel('Vote')
                .setStyle('LINK')
                .setEmoji(client.emojis.cache.get("851169432113512477"))
                .setURL(`https://top.gg/bot/${client.user.id}/vote`),
            new Discord.MessageButton()
                .setLabel('Add Me')
                .setStyle('LINK')
                .setEmoji(client.emojis.cache.get('851173104838377502'))
                .setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=4294967287&scope=bot`),
            new Discord.MessageButton()
                .setLabel('GitHub')
                .setStyle('LINK')
                .setEmoji(client.emojis.cache.get('856179417902350386'))
                .setURL('https://github.com/Iron7III/Aklik')
                .setDisabled(true),
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