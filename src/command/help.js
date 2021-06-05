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
    const prefix = 'f-'
    let Global = [
        {
            'header':'**INFORMACION / SOPORTE**',
            'cmds':[
                `**\`${prefix}help\`**`,
                `**\`${prefix}ping\`**`,
                `**\`${prefix}info\`**`
            ]
        },
        {
            'header':'**FORTNITE**',
            'cmds':[
                `**\`${prefix}aes\`**`,
                `**\`${prefix}map\`** \`[LANGUAGE•BLANK]\``,
                `**\`${prefix}shop\`** (Beta)`,
                `**\`${prefix}news\`** \`[BR•STW•CREATIVE]\` \`[LANGUAGE]\``,
                `**\`${prefix}id\`** \`<COSMETIC_ID>\``
            ]
        },
        {
            'header':'**MODERACION**',
            'cmds':[
                `**\`${prefix}kick\`** \`<MEMBER>\` \`[REASON]\` (Only works with @)`,
                `**\`${prefix}ban\`** \`<MEMBER>\` \`[REASON]\` (Only works with @)`,
                `**\`${prefix}unban\`** \`<MEMBER>\` \`[REASON]\``
            ]
        }
    ]
    const embed = new Discord.MessageEmbed()
        .setTitle(`**${client.user.username} HELP**`)
        .setDescription(`**\`<>\` - Campo Obligatorio\n\`[]\` - Campo Opcional\n\`()\` - Campo Informativo**`)
        .addField('**LISTA DE COMANDOS**',`${Global.map(g => `${g.header}\n${g.cmds.join('\n')}`).join('\n\n')}`)
        .setColor('#ff5e00')
    message.channel.send({ embed: embed })
}