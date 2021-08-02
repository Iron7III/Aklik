const Discord = require("discord.js");

exports.run = async (client, message, args, FortniteAPIComClient, FortniteAPIIoClient, {assets}) => {
    console.log(client.uptime)
    const prefix = 'f-'
    let commands = [
        {
            'header':'**Information / Support**',
            'cmds':[
                `> **\`${prefix}help\`**`,
                `> **\`${prefix}ping\`**`,
                `> **\`${prefix}info\`**`,
                `> **\`${prefix}serverinfo\`**`,
                `> **\`${prefix}userinfo\`** \`[MEMBER|USER]\``
            ]
        },
        {
            'header':'**Fortnite**',
            'cmds':[
                `> **\`${prefix}aes\`**`,
                `> **\`${prefix}shop\`** (Maintenance)`,
                `> **\`${prefix}news\`** \`[br•stw•creative]\` \`[LANGUAGE]\``,
                `> **\`${prefix}fnid\`** \`<COSMETIC_ID>\``
            ]
        },
        {
            'header':'**Moderation**',
            'cmds':[
                `> **\`${prefix}kick\`** \`<MEMBER>\` \`[REASON]\``,
                `> **\`${prefix}ban\`** \`<MEMBER>\` \`[REASON]\``,
                `> **\`${prefix}unban\`** \`<USER>\` \`[REASON]\``,
                `> **\`${prefix}clear\`** \`<NUMBER>\``
            ]
        }
    ]
    const embed = new Discord.MessageEmbed()
        .setTitle(`**${client.user.username} HELP**`)
        .setDescription(`**\`<>\` - Required Parameter\n\`[]\` - Optional Parameter\n\`()\` - Informative Parameter**`)
        .addField('Command List',`${commands.map(g => `${g.header}\n${g.cmds.join('\n')}`).join('\n\n')}`)
        .setColor('#FD3D26')
    const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
                .setLabel('Top.gg')
                .setStyle('LINK')
                .setEmoji(client.emojis.cache.get("851166313372319816"))
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