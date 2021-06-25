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
    function getMemberFromMention(mention) {
        if (!mention) return;
        if (mention.startsWith('<@') && mention.endsWith('>')) {
            mention = mention.slice(2, -1);
            if (mention.startsWith('!')) {
                mention = mention.slice(1);
            }
            return message.channel.guild.members.cache.get(mention);
        }
    }
    let member = args[0]?message.channel.guild.members.cache.get(args[0])||getMemberFromMention(args[0]):message.author;
    console.log(member)
    console.log(message.author.presence.status)
    var Status = member.presence.status;
    console.log(Status);
    var UserStatus = {
        'online': {
            color: '#3BA55B',
            displayName: `${client.emojis.cache.get("857688314429833237")} Online`
        },
        'dnd': {
            color: '#EB4245',
            displayName: `${client.emojis.cache.get("857688314874560562")} Do Not Disturb`
        },
        'idle': {
            color: '#F9A61A',
            displayName: `${client.emojis.cache.get("857688314369802261")} Idle`
        },
        'offline': {
            color: '#737F8D',
            displayName: `${client.emojis.cache.get("857688314269401099")} Offline`
        }
    }
    
    var Field_UserInfo = [
        `**Username ➜ **\`${member.user.username}\``,
        `**Discriminator ➜ **\`${member.user.discriminator}\``,
        `**Mention ➜ **<@${member.id}>`,
        `**ID ➜ **\`${member.id}\``,
    ]
    if(member.user.bot){Field_UserInfo.insert(4,`**BOT ➜ ${client.emojis.cache.get('857854548566474782')}`)}
    const UserInfoEmbed = new Discord.MessageEmbed()
        .setTitle(`${member.user.username} INFORMATION`)
        .addField('USER INFO',Field_UserInfo.join('\n'),false)
        //.addField('MEMBER INFO')
        .addField('STATUS',`**${UserStatus[Status].displayName}**`,false)
        .setColor(UserStatus[Status].color)
    message.channel.send({embed: UserInfoEmbed})
}