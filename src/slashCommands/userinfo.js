const {SlashCommandBuilder} = require('@discordjs/builders');
const Discord = require("discord.js");

module.exports = {
    name: 'userinfo',
    category: 'utility',
    alias: [],
    data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Returns user Discord information.')
    .addUserOption(option => option
        .setName('user')
        .setDescription('Set user\'s mention or id.')
        .setRequired(false)),
    async run(client, interaction){
        console.log(interaction)
        var user, member;
        if(!interaction.options._hoistedOptions[0]){
            user=await interaction.user.fetch(true);
            member=interaction.member;
        } else {
            user=await interaction.options._hoistedOptions[0].user.fetch(true);
            member=interaction.options._hoistedOptions[0].member;
        }
        console.log(user)
        console.log(member)
        const statusTypeDefinition = {
            'online': {
                color: '#3BA55B',
                displayName: `${client.emojis.cache.get("864132043944362024")} \`Online\``
            },
            'dnd': {
                color: '#EB4245',
                displayName: `${client.emojis.cache.get("864132043877384212")} \`Do Not Disturb\``
            },
            'idle': {
                color: '#F9A61A',
                displayName: `${client.emojis.cache.get("864132043881316413")} \`Idle\``
            },
            'offline': {
                color: '#737F8D',
                displayName: `${client.emojis.cache.get("864132044081594369")} \`Offline\``
            }
        };
        const badgesTypeDefinition = {
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
        };
        const permissionTypeDefinition = {
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
        };
        var userDataList = [
            `> **Username ➜ **\`${user.username}\``,
            `> **Discriminator ➜ \`#\`**\`${user.discriminator}\``,
            `> **Mention ➜ **<@${user.id}>`,
            `> **ID ➜ **\`${user.id}\``,
            `> **Registered ➜ **<t:${(user.createdAt.getTime()/1000).toFixed(0)}:d> <t:${(user.createdAt.getTime()/1000).toFixed(0)}:T> **(**<t:${(user.createdAt.getTime()/1000).toFixed(0)}:R>**)**`,
            `> **Badges ➜ **${user.flags!==null?user.flags.toArray().map(badge => badgesTypeDefinition[badge]).join(' '):`\`No badges\``}`
        ];
        const userEmbed = new Discord.MessageEmbed()
        .setAuthor(`${user.username}'s Information`,user.avatar!==null?`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.startsWith('a_')?'gif':'png'}?size=1024`:user.defaultAvatarURL)
        .addField('User Info',userDataList.join('\n'),false)
        .setColor(user.hexAccentColor)
        .setThumbnail(user.avatar!==null?`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.startsWith('a_')?'gif':'png'}?size=1024`:user.defaultAvatarURL);
        const memberEmbed = new Discord.MessageEmbed();
        var embedsArray = [userEmbed];
        if(member!==undefined){
            var memberDataList = [
                `> **Nickname ➜ **\`${member.nickname!==null?member.nickname:'No Nickname'}\``,
                `> **Joined ➜ **<t:${(member.joinedAt.getTime()/1000).toFixed(0)}:d> <t:${(member.joinedAt.getTime()/1000).toFixed(0)}:T> **(**<t:${(member.joinedAt.getTime()/1000).toFixed(0)}:R>**)**`,
                `> **Platforms ➜ **${member.presence!==null&&member.presence.clientStatus.mobile?client.emojis.cache.get('858403427428335636'):client.emojis.cache.get('858406136033837126')} ${member.presence!==null&&member.presence.clientStatus.desktop?client.emojis.cache.get('858403427473948712'):client.emojis.cache.get('858406136046682163')} ${member.presence!==null&&member.presence.clientStatus.web?client.emojis.cache.get('858403427407495168'):client.emojis.cache.get('858406136121524225')}`,
                `> **Booster ➜ **${member.premiumSince!==null?`<t:${(member.premiumSince.getTime()/1000).toFixed(0)}:d> <t:${(member.premiumSince.getTime()/1000).toFixed(0)}:T> **(**<t:${(member.premiumSince.getTime()/1000).toFixed(0)}:R>**)**`:'\`Not boosting\`'}`,
                `> **Status ➜ **${member.presence!==null?statusTypeDefinition[member.presence.status].displayName:statusTypeDefinition['offline'].displayName}`
            ];
            memberEmbed
            .addField('Member Info',memberDataList.join('\n'),false)
            .addField('Permissions',`> ${member.permissions!==null?member.permissions.toArray().map(p => `\`${permissionTypeDefinition[p]}\``).join(' '):`\`No permissions\``}`,false)
            .addField(`Roles [\`${member._roles.length+1}\`]`,`> ${member.roles.cache.map(r => r).join(' ')}`,false)
            .setColor(user.hexAccentColor)
            .setThumbnail(member.avatar!==null?`https://cdn.discordapp.com/guilds/${member.guild.id}/users/${member.id}/avatars/${member.avatar}.${member.avatar.startsWith('a_')?'gif':'png'}?size=1024`:user.defaultAvatarURL);
            embedsArray.push(memberEmbed)
        };
        interaction.reply({embeds: embedsArray});
    }
}