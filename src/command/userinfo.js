const Discord = require("discord.js");
const {assets} = require('../assets.json')

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
    let member = args[0]?message.channel.guild.members.cache.get(args[0])||getMemberFromMention(args[0]):message.channel.guild.members.cache.get(message.author.id);
    let user = args[0]?client.users.cache.get(args[0]):client.users.cache.get(message.author.id);
    let _badges = {
        'EARLY_SUPPORTER': client.emojis.cache.get('864140289492385802'),
        'DISCORD_EMPLOYEE': client.emojis.cache.get('864133588433371217'),
        'PARTNERED_SERVER_OWNER': client.emojis.cache.get('864133588165722152'),
        'HYPESQUAD_EVENTS': client.emojis.cache.get('864133588328644618'),
        'HOUSE_BRAVERY': client.emojis.cache.get('864133587908689931'),
        'HOUSE_BRILLIANCE': client.emojis.cache.get('864133588173062184'),
        'HOUSE_BALANCE': client.emojis.cache.get('864133588164280340'),
        'BUGHUNTER_LEVEL_1': client.emojis.cache.get('864133587875266602'),
        'BUGHUNTER_LEVEL_2': client.emojis.cache.get('864133588126531604'),
        'EARLY_VERIFIED_BOT_DEVELOPER': client.emojis.cache.get('864133588152746000'),
        'VERIFIED_BOT': '<:verified:753442204541911081>',
        'DISCORD_CERTIFIED_MODERATOR': client.emojis.cache.get('864133588119060481')
    }
    let _status = {
        'online': {
            color: '#3BA55B',
            displayName: `${client.emojis.cache.get("864132043944362024")} Online`
        },
        'dnd': {
            color: '#EB4245',
            displayName: `${client.emojis.cache.get("864132043877384212")} Do Not Disturb`
        },
        'idle': {
            color: '#F9A61A',
            displayName: `${client.emojis.cache.get("864132043881316413")} Idle`
        },
        'offline': {
            color: '#737F8D',
            displayName: `${client.emojis.cache.get("864132044081594369")} Offline`
        }
    }
    if(member){
        let _permissions = {
            'ADMINISTRATOR':  'Administrator',
            'CREATE_INSTANT_INVITE': 'Create Instant Invite',
            'KICK_MEMBERS': 'Kick Members',
            'BAN_MEMBERS': 'Ban Members',
            'MANAGE_CHANNELS': 'Manage Channels',
            'MANAGE_GUILD': 'Manage Guild',
            'ADD_REACTIONS': 'Add Reactions',
            'VIEW_AUDIT_LOG': 'View Audit Log',
            'PRIORITY_SPEAKER': 'Priority Speaker',
            'STREAM': 'Stream',
            'VIEW_CHANNEL': 'View Channel',
            'SEND_MESSAGES': 'Send Messages',
            'SEND_TTS_MESSAGES': 'Send TTS Messages',
            'MANAGE_MESSAGES': 'Manage Messages',
            'EMBED_LINKS': 'Embed Links',
            'ATTACH_FILES': 'Attach Files',
            'READ_MESSAGE_HISTORY': 'Read Message History',
            'MENTION_EVERYONE': 'Mention Everyone',
            'USE_EXTERNAL_EMOJIS': 'Use External Emojis',
            'VIEW_GUILD_INSIGHTS': 'View Guild Insights',
            'CONNECT': 'Connect',
            'SPEAK': 'Speak',
            'MUTE_MEMBERS': 'Mute Members',
            'DEAFEN_MEMBERS': 'Deafen Members',
            'MOVE_MEMBERS': 'Move Members',
            'USE_VAD': 'Use VAD',
            'CHANGE_NICKNAME': 'Change Nickname',
            'MANAGE_NICKNAMES': 'Manage Nicknames',
            'MANAGE_ROLES': 'Manage Roles',
            'MANAGE_WEBHOOKS': 'Manage WebHooks',
            'MANAGE_EMOJIS': 'Manage Emojis',
            'USE_APPLICATION_COMMANDS': 'Use Applications Commands',
            'REQUEST_TO_SPEAK': 'Request To Speak'
        }
        var MemberInfo_Member = [
            `> **Nickname ➜ **\`${member.nickname!==null?member.nickname:'No Nickname'}\``,
            `> **Booster ➜ **\`${member.premiumSince!=null?`Boosting [${member.premiumSince.getDate()>9?member.premiumSince.getDate():`0${member.premiumSince.getDate()}`}-${member.premiumSince.getMonth()>9?member.premiumSince.getMonth():`0${member.premiumSince.getMonth()+1}`}-${member.premiumSince.getFullYear()}\` **|** \`${member.premiumSince.getHours()>9?member.premiumSince.getHours():`0${member.premiumSince.getHours()}`}:${member.premiumSince.getMinutes()>9?member.premiumSince.getMinutes():`0${member.premiumSince.getMinutes()}`}:${member.premiumSince.getSeconds()>9?member.premiumSince.getSeconds():`0${member.premiumSince.getSeconds()}`}]`:`Not Boosting`}\``,
            `> **Joined ➜ **\`${member.joinedAt.getDate()>9?member.joinedAt.getDate():`0${member.joinedAt.getDate()}`}-${member.joinedAt.getMonth()>9?member.joinedAt.getMonth():`0${member.joinedAt.getMonth()+1}`}-${member.joinedAt.getFullYear()}\` **|** \`${member.joinedAt.getHours()>9?member.joinedAt.getHours():`0${member.joinedAt.getHours()}`}:${member.joinedAt.getMinutes()>9?member.joinedAt.getMinutes():`0${member.joinedAt.getMinutes()}`}:${member.joinedAt.getSeconds()>9?member.joinedAt.getSeconds():`0${member.joinedAt.getSeconds()}`}\``,
            `> **Permissions ➜ **${member.permissions!==null?member.permissions.toArray().map(p => `\`${_permissions[p]}\``).join(' '):`\`No permissions\``}`,
            `> **Roles ➜ [\`${member._roles.length+1}\`]**${member.roles.cache.map(r => r).join(' ')}`
        ]
        var MemberInfo_User = [
            `> **Username ➜ **\`${member.user.username}\``,
            `> **Discriminator ➜ **\`${member.user.discriminator}\``,
            `> **Mention ➜ **<@${member.id}>`,
            `> **ID ➜ **\`${member.id}\``,
            `> **Platforms ➜ **${member.presence.clientStatus!=null&&member.presence.clientStatus.mobile?`${client.emojis.cache.get('858403427428335636')}`:client.emojis.cache.get('858406136033837126')} ${member.presence.clientStatus!=null&&member.presence.clientStatus.desktop?`${client.emojis.cache.get('858403427473948712')}`:client.emojis.cache.get('858406136046682163')} ${member.presence.clientStatus!=null&&member.presence.clientStatus.web?`${client.emojis.cache.get('858403427407495168')}`:client.emojis.cache.get('858406136121524225')}`,
            `> **Registered ➜ **<t:${user.createdAt.getDate()>9?user.createdAt.getDate():`0${user.createdAt.getDate()}`}-${user.createdAt.getMonth()>9?user.createdAt.getMonth():`0${user.createdAt.getMonth()+1}`}-${user.createdAt.getFullYear()}:d> <t:${member.user.createdTimestamp}:T> (<t:${member.user.createdAt}:R>)`,
            `> **Badges ➜ **${member.user.flags!==null?member.user.flags.toArray().map(b => _badges[b]).join(' '):`\`No badges\``}`
        ]
        if(member.user.bot){
            if(member.user.flags==null||!member.user.flags.has('VERIFIED_BOT')) {
                MemberInfo_User.splice(4,0,`> **BOT ➜ **${client.emojis.cache.get('857854548566474782')}`)
            } else {
                MemberInfo_User.splice(4,0,`> **BOT ➜ **${client.emojis.cache.get('860997112652627978')}${client.emojis.cache.get('860997112397168662')}`)
            }
        }
        const MemberInfoEmbed = new Discord.MessageEmbed()
            .setAuthor(`${member.user.username}'s Information`,member.user.displayAvatarURL({dynamic:true,size:512}))
            .addField('User Info',MemberInfo_User.join('\n'),false)
            .addField('Member Info',MemberInfo_Member.join('\n'),false)
            .addField('Status',`> **${_status[member.presence.status].displayName}**`,false)
            .setColor(_status[member.presence.status].color)
            .setThumbnail(member.user.displayAvatarURL({dynamic:true,size:1024}))
        if(member.presence.activities){
            member.presence.activities.map(a => {
                let _activities = []
                if(a.details!==null&&a.state!==null){
                    _activities.push(`> **${a.details}**`,`> **${a.state}**`,`> **${a.timestamps!==null?`Since ${a.timestamps.start.toString().substring(16,24)}`:`Infinite`}**`)
                }
                if(a.details!==null&&a.state===null){
                    _activities.push(`> **${a.details}**`,`> **${a.timestamps!==null?`Since ${a.timestamps.start.toString().substring(16,24)}`:`Infinite`}**`)
                }
                if(a.details===null&&a.state!==null){
                    _activities.push(`> **${a.state}**`,`> **${a.timestamps!==null?`Since ${a.timestamps.start.toString().substring(16,24)}`:`Infinite`}**`)
                }
                if(a.details===null&&a.state===null){
                    _activities.push(`> **${a.timestamps!==null?`Since ${a.timestamps.start.toString().substring(16,24)}`:`Infinite`}**`)
                }
                MemberInfoEmbed.addField(`${a.name}`, `${_activities.join('\n')}`)
            })
        }
        message.channel.send({embed: MemberInfoEmbed})
    } else if(user){
        var UserInfo_User = [
            `> **Username ➜ **\`${user.username}\``,
            `> **Discriminator ➜ **\`${user.discriminator}\``,
            `> **Mention ➜ **<@${user.id}>`,
            `> **ID ➜ **\`${user.id}\``,
            `> **Registered ➜ **<t:${user.createdAt.getDate()>9?user.createdAt.getDate():`0${user.createdAt.getDate()}`}-${user.createdAt.getMonth()>9?user.createdAt.getMonth():`0${user.createdAt.getMonth()+1}`}-${user.createdAt.getFullYear()}:d> <t:${user.createdTimestamp}:T> <t:${user.createdTimestamp}:R>`,
            `> **Badges ➜ **${user.flags!==null?user.flags.toArray().map(b => _badges[b]).join(' '):`\`No badges\``}`
        ]
        console.log(user.createdTimestamp)
        //\`${user.createdAt.getDate()>9?user.createdAt.getDate():`0${user.createdAt.getDate()}`}-${user.createdAt.getMonth()>9?user.createdAt.getMonth():`0${user.createdAt.getMonth()+1}`}-${user.createdAt.getFullYear()} | ${user.createdAt.getHours()>9?user.createdAt.getHours():`0${user.createdAt.getHours()}`}:${user.createdAt.getMinutes()>9?user.createdAt.getMinutes():`0${user.createdAt.getMinutes()}`}:${user.createdAt.getSeconds()>9?user.createdAt.getSeconds():`0${user.createdAt.getSeconds()}`}\`
        if(user.bot){
            if(member.user.flags==null||!member.user.flags.has('VERIFIED_BOT')) {
                MemberInfo_User.splice(4,0,`> **BOT ➜ **${client.emojis.cache.get('857854548566474782')}`)
            } else {
                MemberInfo_User.splice(4,0,`> **BOT ➜ **${client.emojis.cache.get('860997112652627978')}${client.emojis.cache.get('860997112397168662')}`)
            }
        }
        const UserInfoEmbed = new Discord.MessageEmbed()
            .setAuthor(`${user.username}'s Information`,user.displayAvatarURL({dynamic:true,size:512}))
            .addField('User Info',UserInfo_User.join('\n'),false)
            .setColor(_status["offline"].color)
            .setThumbnail(user.displayAvatarURL({dynamic:true,size:1024}))
        message.channel.send({embed: UserInfoEmbed})
    } else if(!member&&!user){
        const ErrorEmbed = new Discord.MessageEmbed()
            .setAuthor(`I don't have any data about this user.`,assets.error)
            .setColor('#ED4245')
        message.channel.send({embed: ErrorEmbed})
    }
}