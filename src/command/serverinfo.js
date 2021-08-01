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
    let ServerInfo_General = [
        `> **Name ➜ **\`${guild.name}\``,
        `> **ID ➜ **\`${guild.id}\``,
        `> **Locale ➜ **\`${guild.preferredLocale}\``,
        `> **Members ➜ **\`${guild.memberCount}\``,
        `> **Owner ➜ **<@${guild.ownerId}> ${client.emojis.cache.get('860997112434786315')} ${message.channel.guild.members.cache.get(guild.ownerId).premiumSince!=null?client.emojis.cache.get('860999928217206795'):` `} **|** \`${guild.ownerId}\``,
        `> **Maximum Members ➜ **\`${guild.maximumMembers}\``,
        `> **Maximum Presences ➜ **\`${guild.maximumPresences!=null?guild.maximumPresences:`∞`}\``,
        `> **Created ➜ **\` \``,
    ]
    let ServerInfo_BoostStatus = [
        `> **Boost Tier ➜ **\`${PremiumTier[guild.premiumTier]}\``,
        `> **Boost Count ➜ **\`${guild.premiumSubscriptionCount}\``
    ]
    let ServerInfo_Moderation = [
        `> **Bans ➜ **`,
        `> **Verification Level ➜ **\`${VerificationLevel[guild.verificationLevel]}\``,
        `> **AFK Timeout ➜ **\`${date.getHours()>9?date.getHours():`0${date.getHours()}`}:${date.getMinutes()>9?date.getMinutes():`0${date.getMinutes()}`}:${date.getSeconds()>9?date.getSeconds():`0${date.getSeconds()}`}\``,
        `> **AFK Channel ➜ **${guild.afkChannel?`${guild.afkChannel} **|** \`${guild.afkChannelId}\``:'\`None\`'}`,
        `> **Rules Channel ➜ **${guild.rulesChannel?`${guild.rulesChannel} **|** \`${guild.rulesChannelId}\``:'\`None\`'}`,
        `> **System Channel ➜ **${guild.systemChannel?`${guild.systemChannel} **|** \`${guild.systemChannelId}\``:'\`None\`'}`,
        `> **Community Updates Channel ➜ **${guild.publicUpdatesChannel?`${guild.publicUpdatesChannel} **|** \`${guild.publicUpdatesChannelId}\``:'\`None\`'}`,
        `> **Vanity URL ➜ **${guild.vanityURLCode?`${guild.vanityURLCode} **|** \`${guild.vanityURLUses}\``:'\`None\`'}`
    ]
    const embed = new Discord.MessageEmbed()
        .setAuthor(`${guild.name}'s Information`,guild.iconURL({dynamic:true,size:512}))
        .addField('General Info',ServerInfo_General.join('\n'),false)
        .addField('Boost Status Info',ServerInfo_BoostStatus.join('\n'),false)
        .addField('Moderation Info',ServerInfo_Moderation.join('\n'),false)
        .setColor('#FD3D26')
        .setThumbnail(guild.iconURL({dynamic:true,size:512}))
    if(guild.description!==null){
        embed.setDescription(guild.description)
    }
    message.channel.send({embeds: [embed]})
}