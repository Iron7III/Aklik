const Discord = require("discord.js");
const client = new Discord.Client({
    disableEveryone: true,
    fetchAllMembers: true,
    intents: ['GUILDS','GUILD_MEMBERS','GUILD_BANS','GUILD_EMOJIS_AND_STICKERS','GUILD_INTEGRATIONS','GUILD_WEBHOOKS','GUILD_INVITES','GUILD_VOICE_STATES','GUILD_PRESENCES','GUILD_MESSAGES','GUILD_MESSAGE_REACTIONS','GUILD_MESSAGE_TYPING','DIRECT_MESSAGES','DIRECT_MESSAGE_REACTIONS','DIRECT_MESSAGE_TYPING']
});
const FortniteAPICom = require("fortnite-api-com");
const config = {
    apikey: "",
    language: "en"
};
var FortniteAPIComClient = new FortniteAPICom(config);
const FortniteAPIIo = require("fortnite-api-io");
const FortniteAPIIoClient = new FortniteAPIIo("1c43003c-41511d50-7062e583-6ea047a7")
const {assets} = require('./assets.json')
const express = require('express')
const ApiSwgohHelp = require('api-swgoh-help');
const swgoh = new ApiSwgohHelp({
    "username":"Iron",
    "password":"02122005asj"
});
function checkSnowflakeId(Id) {
    if(!Id) {
        console.log('undefined')
        return undefined
    } else if(Discord.SnowflakeUtil.deconstruct(Id).timestamp<=1420070400000){
        console.log('false')
        return false;
    } else if(Discord.SnowflakeUtil.deconstruct(Id).timestamp>1420070400000) {
        console.log(Discord.SnowflakeUtil.deconstruct(Id));
        try {
            return true
        } catch (error) {
            return false
        }
    }
}

client.on("ready", async () => {
    console.log(`[${client.user.username}] Connected and ready up.`);
    let acquiredToken = await swgoh.connect();
    var UserDate = Date.now()/1000;
    const readyEmbed = new Discord.MessageEmbed()
        .setAuthor(`Connected`,assets.ready)
        .setDescription(`> **PING ➜ **\`${Math.round(client.ws.ping)}\`\n> **DATE ➜ **<t:${UserDate.toFixed(0)}:d> **|** <t:${UserDate.toFixed(0)}:T>`)
        .setColor('#FD3D26')
    client.channels.cache.get()
    client.api.channels('853697844333772820').messages.post({
        type: 1,
        data: {
            content: ' ',
            embed: readyEmbed,
            components: null
        }
    })
    client.user.setPresence({
        activities: [
            {
                name: 'Use f-help :D',
                type: 'COMPETING'
            }
        ],
        status: 'dnd'
    });
    const { generateShop, getShopItems } = require("./shop");
    const { apiKey, language, watermark } = require("./config.json");
    (async () => {
        //const items = await getShopItems(apiKey, language);
        //await generateShop(items, watermark);
    })()
})

client.on("messageCreate", async message => {
    let prefix = "f-";
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd===undefined||!message.content.startsWith(`${prefix}${cmd}`||message.channel.dm)) return;
    if(!message.guild.me.permissionsIn(message.channel).has('EMBED_LINKS')){
        message.channel.send({content:'I need \`Embed Links\` permission.'})
        return;
    }
    try {
        let file = require(`./command/${cmd}.js`);
        file.run(client, message, args, FortniteAPIComClient,FortniteAPIIoClient, {assets}, checkSnowflakeId, swgoh);
        console.log(`[${client.user.username}] Used \'${cmd}\'.`);
    } catch (e) {
        message.channel.send('Este comando no existe').then(msg => setTimeout(() => msg.delete(), 5000))
        console.log(e.stack)
    } finally {
        var _commandInfo = [
            `> **Guild ➜** \`${message.guild.name}\` **|** \`${message.guild.id}\``,
            `> **Channel ➜** \`#${message.channel.name}\` **|** \`${message.channel.id}\``,
            `> **User ➜** <@${message.author.id}> **|** \`${message.author.id}\``,
            `> **Date ➜** <t:${(message.createdTimestamp/1000).toFixed(0)}:d> **|** <t:${(message.createdTimestamp/1000).toFixed(0)}:T>`,
            `> **Command ➜** **\`${prefix}\`**\`${cmd}\``,
            `> **Arguments ➜** ${args[0]?args.map(a=>`\`${a}\``).join(' '):'\`No arguments provided\`'}`
        ]
        const commandEmbed = new Discord.MessageEmbed()
            .setAuthor('Command Executed',assets.command)
            .setDescription(_commandInfo.join('\n'))
            .setColor('#FD3D26')
        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setLabel('COMMAND URL')
                    .setStyle('LINK')
                    .setURL(message.url),
                new Discord.MessageButton()
                    .setLabel('SERVER')
                    .setStyle('LINK')
                    .setURL(`https://discord.gg/${(await message.channel.createInvite({maxAge: 0})).code}`)
            )
        client.api.channels('853697754706739250').messages.post({
            type: 1,
            data: {
                content: ' ',
                embeds: [commandEmbed],
                components: [
                    row
                ]
            }
        }).catch(e => console.log(e))
    }
});

client.on("guildCreate", (guild) => {
    let _info = [
        `> **Name ➜ **\`${guild.name}\``,
        `> **ID ➜ **\`${guild.id}\``,
        `> **Members ➜ **\`${guild.memberCount}\``,
        `> **Owner ➜ **<@${guild.ownerId}> ${client.emojis.cache.get('860997112434786315')} ${guild.members.cache.get(guild.ownerId).premiumSince!=null?client.emojis.cache.get('860999928217206795'):` `} **|** \`${guild.ownerId}\``
    ]
    const guildCreateEmbed = new Discord.MessageEmbed()
        .setAuthor(`Joined Server`,assets.guildCreate)
        .setDescription(_info.join('\n'))
        .setColor('#57F287')
        .setThumbnail(guild.iconURL({dynamic:true,size:512}))
        .setImage(guild.bannerURL())
    const row = new Discord.MessageActionRow()
    .addComponents(
        new Discord.MessageButton()
            .setLabel('SERVER')
            .setStyle('LINK')
            .setURL(`https://discord.gg/`),
        new Discord.MessageButton()
            .setLabel('LEAVE SERVER')
            .setStyle('DANGER')
            .setCustomId('leave_server')
            .setDisabled(true)
    )
    client.api.channels('853697886335008808').messages.post({
        type: 1,
        data: {
            content: ' ',
            embeds: [guildCreateEmbed],
            components: [
                row
            ]
        }
    }).catch(e => console.log(e))
})

client.on("guildDelete", (guild) => {
    let _info = [
        `> **Name ➜ **\`${guild.name}\``,
        `> **ID ➜ **\`${guild.id}\``,
        `> **Members ➜ **\`${guild.memberCount}\``,
        `> **Owner ➜ **<@${guild.ownerId}> ${client.emojis.cache.get('860997112434786315')} ${guild.members.cache.get(guild.ownerId).premiumSince!=null?client.emojis.cache.get('860999928217206795'):` `} **|** \`${guild.ownerId}\``
    ]
    const guildDeleteEmbed = new Discord.MessageEmbed()
        .setAuthor(`Left Server`,guild.iconURL({dynamic:true,size:512}))
        .setDescription(_info.join('\n'))
        .setColor('#FD3D26')
    client.channels.cache.get('853697886335008808').send({embeds:[guildDeleteEmbed]}).catch(e=>console.log(e))
})

client.login('NTY4NDM1NjE2MTUzMzM3OTE2.XLiC6w.ReMH4ndYBbjqZVZrSqxhQ81VDdE').catch(e => console.log(e));