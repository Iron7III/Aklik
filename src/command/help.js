const Discord = require("discord.js");
const {assets} = require('../assets.json')

exports.run = async (client, message, args, Fortnite) => {
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
                .setLabel('Information')
                .setStyle('DANGER')
                .setCustomID('information')
                .setEmoji('851207714465906718')
                .setDisabled(true),
            new Discord.MessageButton()
                .setLabel('Fortnite')
                .setStyle('DANGER')
                .setCustomID('fortnite')
                .setEmoji('851207714465906718')
                .setDisabled(true),
            new Discord.MessageButton()
                .setLabel('Moderation')
                .setStyle('DANGER')
                .setCustomID('moderation')
                .setEmoji('851146036722008084')
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