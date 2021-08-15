const Discord = require("discord.js");

exports.run = async (client, message, args, FortniteAPIComClient,FortniteAPIIoClient, {assets}, checkSnowflakeId) => {
    function getIdFromMention(mention) {
        if (!mention) return;
        if (mention.startsWith('<@') && mention.endsWith('>')) {
            mention = mention.slice(2, -1);
            if (mention.startsWith('!')) {
                mention = mention.slice(1);
            }
            return mention;
        }
    }
    console.log(checkSnowflakeId(args[0]?getIdFromMention(args[0])||args[0]:message.author.id))
    const InvalidSnowflakeUserId = new Discord.MessageEmbed()
            .setAuthor(`Write a valid ID.`,assets.error)
            .setColor('#ED4245')
    if(checkSnowflakeId(args[0]?getIdFromMention(args[0])||args[0]:message.author.id)===false){
        message.channel.send({embeds:[InvalidSnowflakeUserId]})
        return ;
    } else if(checkSnowflakeId(args[0]?getIdFromMention(args[0])||args[0]:message.author.id)===true){
        const User = await client.users.fetch(args[0]?getIdFromMention(args[0])||args[0]:message.author.id,{cache: false}).catch(e=>{
            message.channel.send({embeds:[InvalidSnowflakeUserId]})
            return;
        });
        console.log(User)
        const APIUser = await client.api.users(args[0]?getIdFromMention(args[0])||args[0]:message.author.id).get().catch(e=>{
            return;
        });
        console.log(APIUser)
        const Member = args[0]?message.channel.guild.members.cache.get(getIdFromMention(args[0])||args[0]):message.channel.guild.members.cache.get(message.author.id);
        let Badges = {
            'DISCORD_EMPLOYEE': client.emojis.cache.get('864133588433371217'),
            'PARTNERED_SERVER_OWNER': client.emojis.cache.get('864133588165722152'),
            'DISCORD_CERTIFIED_MODERATOR': client.emojis.cache.get('864133588119060481'),
            'HYPESQUAD_EVENTS': client.emojis.cache.get('864133588328644618'),
            'HOUSE_BRAVERY': client.emojis.cache.get('864133587908689931'),
            'HOUSE_BRILLIANCE': client.emojis.cache.get('864133588173062184'),
            'HOUSE_BALANCE': client.emojis.cache.get('864133588164280340'),
            'BUGHUNTER_LEVEL_1': client.emojis.cache.get('864133587875266602'),
            'BUGHUNTER_LEVEL_2': client.emojis.cache.get('864133588126531604'),
            'EARLY_VERIFIED_BOT_DEVELOPER': client.emojis.cache.get('864133588152746000'),
            'EARLY_SUPPORTER': client.emojis.cache.get('864140289492385802')
        }
        let Permissions = {
            'ADMINISTRATOR': 'Administrator',
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
            'REQUEST_TO_SPEAK': 'Request To Speak',
            'MANAGE_THREADS': 'Manage Threads',
            'USE_PUBLIC_THREADS': 'Use Public Threads',
            'USE_PRIVATE_THREADS': 'Use Private Threads',
            'USE_EXTERNAL_STICKERS': 'Use External Stickers'
        }
        let Status = {
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
        if(User){
            var UserBadges = User.flags.toArray().map(b => Badges[b]);
            var UserBadges = User.flags.toArray().map(b => Badges[b]);
            if(APIUser.avatar!==null){
                if(APIUser.avatar.startsWith('a_')){
                    UserBadges.push(client.emojis.cache.get('867772736651001926'))
                } else {
                    if(APIUser.banner!==null){
                        if(APIUser.banner.startsWith('a_')){
                            UserBadges.push(client.emojis.cache.get('867772736651001926'))
                        }
                    }
                }
            }
            var UserInfo = [
                `> **Username ➜ **\`${User.username}\``,
                `> **Discriminator ➜ **\`${User.discriminator}\``,
                `> **Mention ➜ **<@${User.id}>`,
                `> **ID ➜ **\`${User.id}\``,
                `> **Registered ➜ **<t:${(User.createdAt.getTime()/1000).toFixed(0)}:d> <t:${(User.createdAt.getTime()/1000).toFixed(0)}:T> (<t:${(User.createdAt.getTime()/1000).toFixed(0)}:R>)`,
                `> **Badges ➜ **${User.flags!==null?UserBadges.join(' '):`\`No badges\``}`
            ]
            if(User.bot===true){
                if(User.system===true){
                    UserInfo.splice(4,0,`> **SYSTEM ➜ **${client.emojis.cache.get('865301427756335125')}`)
                } else {
                    if(User.flags==null||!User.flags.has('VERIFIED_BOT')) {
                        UserInfo.splice(4,0,`> **BOT ➜ **${client.emojis.cache.get('857854548566474782')}`)
                    } else {
                        UserInfo.splice(4,0,`> **BOT ➜ **${client.emojis.cache.get('860997112652627978')}${client.emojis.cache.get('860997112397168662')}`)
                    }
                }
            }
            let UserInfoBase = new Discord.MessageEmbed()
            .setAuthor(`${User.username}'s Information`,APIUser.avatar!==null?`https://cdn.discordapp.com/avatars/${User.id}/${User.avatar}.${User.avatar.startsWith('a_')?'gif':'png'}?size=1024`:User.defaultAvatarURL)
            .addField('User Info',UserInfo.join('\n'),false)
            .setColor(Status["offline"].color)
            .setThumbnail(APIUser.avatar!==null?`https://cdn.discordapp.com/avatars/${User.id}/${User.avatar}.${User.avatar.startsWith('a_')?'gif':'png'}?size=1024`:User.defaultAvatarURL)
            const Banner = new Discord.MessageEmbed()
            .setColor(Status["offline"].color)
            if(Member){
                var MemberInfo = [
                    `> **Nickname ➜ **\`${Member.nickname!==null?Member.nickname:'No Nickname'}\``,
                    `> **Booster ➜ **\`${Member.premiumSince!=null?`Boosting [${Member.premiumSince.getDate()>9?Member.premiumSince.getDate():`0${Member.premiumSince.getDate()}`}-${Member.premiumSince.getMonth()>9?Member.premiumSince.getMonth():`0${Member.premiumSince.getMonth()+1}`}-${Member.premiumSince.getFullYear()}\` **|** \`${Member.premiumSince.getHours()>9?Member.premiumSince.getHours():`0${Member.premiumSince.getHours()}`}:${Member.premiumSince.getMinutes()>9?Member.premiumSince.getMinutes():`0${Member.premiumSince.getMinutes()}`}:${Member.premiumSince.getSeconds()>9?Member.premiumSince.getSeconds():`0${Member.premiumSince.getSeconds()}`}]`:`Not Boosting`}\``,
                    `> **Joined ➜ **<t:${(Member.joinedAt.getTime()/1000).toFixed(0)}:d> <t:${(Member.joinedAt.getTime()/1000).toFixed(0)}:T> (<t:${(Member.joinedAt.getTime()/1000).toFixed(0)}:R>)`,
                    `> **Platforms ➜ **${Member.presence!==null&&Member.presence.clientStatus.mobile?client.emojis.cache.get('858403427428335636'):client.emojis.cache.get('858406136033837126')} ${Member.presence!==null&&Member.presence.clientStatus.desktop?client.emojis.cache.get('858403427473948712'):client.emojis.cache.get('858406136046682163')} ${Member.presence!==null&&Member.presence.clientStatus.web?client.emojis.cache.get('858403427407495168'):client.emojis.cache.get('858406136121524225')}`,
                ]
                var MemberInfo2 = [
                    `> **Permissions ➜ **${Member.permissions!==null?Member.permissions.toArray().map(p => `\`${Permissions[p]}\``).join(' '):`\`No permissions\``}`,
                    `> **Roles ➜ [\`${Member._roles.length+1}\`]** ${Member.roles.cache.map(r => r).join(' ')}`
                ]
                UserInfoBase
                .addField('Member Info',MemberInfo.join('\n'),false)
                .addField('Member Info 2',MemberInfo2.join('\n'),false)
                .addField('Status',`> **${Member.presence!==null?Status[Member.presence.status].displayName:Status['offline'].displayName}**`,false)
                .setColor(Member.presence!==null?Status[Member.presence.status].color:Status['offline'].color)
                Banner.setColor(Member.presence!==null?Status[Member.presence.status].color:Status['offline'].color)
                if(Member.presence!==null&&Member.presence.activities){
                    Member.presence.activities.map(a => {
                        let Activities = []
                        if(a.details){
                            Activities.push(`> **${a.details}**`)
                        }
                        if(a.state){
                            Activities.push(`> **${a.state}**`)
                        }
                        console.log(a.timestamps)
                        Activities.push(`> **${a.timestamps!==null?`Since ${a.timestamps.start.toString().substring(16,24)}`:`Infinite`}**`)
                        UserInfoBase.addField(`${a.name}`, `${Activities.join('\n')}`)
                    })
                }
            }
            message.channel.send({embeds:[UserInfoBase]})
            if(APIUser.banner!==null){
                Banner.setImage(`https://cdn.discordapp.com/banners/${User.id}/${APIUser.banner}.${APIUser.banner.startsWith('a_')?'gif':'png'}?size=512`)
                message.channel.send({embeds:[Banner]})
            }
        }
    }
}