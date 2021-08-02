const Discord = require("discord.js");

exports.run = async (client, message, args, FortniteAPIComClient, FortniteAPIIoClient, {assets}) => {
    const guild = message.guild;
    //console.log(guild)
    var date = new Date(guild.afkTimeout*1000)
    //> **Registered ➜ **
    let VerificationLevel = {
        "NONE": "A",
        "LOW": "Low",
        "MEDIUM": "Medium",
        "HIGH": "(╯°□°）╯︵ ┻━┻",
        "VERY_HIGH": "┻━┻︵ ヽ(ಠ益ಠ)ノ ︵ ┻━┻"
    }
    let PremiumTier = {
        "NONE":"None",
        "TIER_1":"Level 1",
        "TIER_2":"Level 2",
        "TIER_3":"Level 3"
    }
    let Features = {
        "ANIMATED_ICON":"Animated Icon",
        "BANNER":"Banner",
        "COMMERCE":"Commerce",
        "COMMUNITY":"Community",
        "DISCOVERABLE":"Discoverable",
        "FEATURABLE":"Featurable",
        "INVITE_SPLASH":"Invite Splash",
        "MEMBER_VERIFICATION_GATE_ENABLED":"Member Verification Gate",
        "MONETIZATION_ENABLED":"Monetization",
        "MORE_STICKERS":"More Stickers",
        "NEWS":"News",
        "PARTNERED":"Partnered",
        "PREVIEW_ENABLED":"Preview",
        "PRIVATE_THREADS":"Private Threads",
        "RELAY_ENABLED":"Relay",
        "SEVEN_DAY_THREAD_ARCHIVE":"Seven Day Thread Archive",
        "THREE_DAY_THREAD_ARCHIVE":"Three Day Thread Archive",
        "TICKETED_EVENTS_ENABLED":"Ticketed Events",
        "VANITY_URL":"Vanity URL",
        "VERIFIED":"Verified",
        "THREADS_ENABLED":"Threads",
        "VIP_REGIONS":"VIP Regions",
        "WELCOME_SCREEN_ENABLED":"Welcome Screen",
    }
    let ServerInfo_General = [
        `> **Name ➜ **\`${guild.name}\``,
        `> **ID ➜ **\`${guild.id}\``,
        `> **Locale ➜ **\`${guild.preferredLocale}\``,
        `> **Members ➜ **\`${guild.memberCount}\``,
        `> **Owner ➜ **<@${guild.ownerId}> ${client.emojis.cache.get('860997112434786315')} ${message.channel.guild.members.cache.get(guild.ownerId).premiumSince!=null?client.emojis.cache.get('860999928217206795'):` `} **|** \`${guild.ownerId}\``,
        `> **Maximum Members ➜ **\`${guild.maximumMembers}\``,
        `> **Maximum Presences ➜ **\`${guild.maximumPresences!=null?guild.maximumPresences:`∞`}\``,
        `> **Created ➜ **<t:${(guild.createdAt.getTime()/1000).toFixed(0)}:d> <t:${(guild.createdAt.getTime()/1000).toFixed(0)}:T> (<t:${(guild.createdAt.getTime()/1000).toFixed(0)}:R>)`,
    ]
    let ServerInfo_BoostStatus = [
        `> **Boost Tier ➜ **\`${PremiumTier[guild.premiumTier]}\``,
        `> **Boost Count ➜ **\`${guild.premiumSubscriptionCount}\``
    ]
    let ServerInfo_Moderation = [
        `> **Verification Level ➜ **\`${VerificationLevel[guild.verificationLevel]}\``,
        `> **AFK Timeout ➜ **\`${(date.getHours()-1)>9?date.getHours()-1:`0${date.getHours()-1}`}:${date.getMinutes()>9?date.getMinutes():`0${date.getMinutes()}`}:${date.getSeconds()>9?date.getSeconds():`0${date.getSeconds()}`}\``,
        `> **AFK Channel ➜ **${guild.afkChannel?`${guild.afkChannel} **|** \`${guild.afkChannelId}\``:'\`None\`'}`,
        `> **Rules Channel ➜ **${guild.rulesChannel?`${guild.rulesChannel} **|** \`${guild.rulesChannelId}\``:'\`None\`'}`,
        `> **System Channel ➜ **${guild.systemChannel?`${guild.systemChannel} **|** \`${guild.systemChannelId}\``:'\`None\`'}`,
        `> **Community Updates Channel ➜ **${guild.publicUpdatesChannel?`${guild.publicUpdatesChannel} **|** \`${guild.publicUpdatesChannelId}\``:'\`None\`'}`,
        `> **Vanity URL ➜ **${guild.vanityURLCode?`${guild.vanityURLCode} **|** \`${guild.vanityURLUses}\``:'\`None\`'}`
    ]
    console.log(guild.features)
    const embed = new Discord.MessageEmbed()
        .setAuthor(`${guild.name}'s Information`,guild.iconURL({dynamic:true,size:512}))
        .addField('General Info',ServerInfo_General.join('\n'),false)
        .addField('Boost Status Info',ServerInfo_BoostStatus.join('\n'),false)
        .addField('Features',`> \`\`\`\n${guild.features.map(f => `> ${Features[f]}`).join('\n')}\n> \`\`\``,false)
        .addField('Moderation Info',ServerInfo_Moderation.join('\n'),false)
        .setColor('#FD3D26')
        .setThumbnail(guild.iconURL({dynamic:true,size:512}))
    if(guild.description!==null){
        embed.setDescription(guild.description)
    }
    message.channel.send({embeds: [embed]})
}