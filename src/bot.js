//VARIABLES GENERALES
const Discord = require("discord.js");
const client = new Discord.Client({
    disableEveryone: true,
    fetchAllMembers: true,
    ws: {
        properties: {
            $browser: "Discord Android"
        }
    },
    intents: Discord.Intents.PRIVILEGED
    //intents: Discord.Intents.NON_PRIVILEGED
});
const FortniteAPI = require("fortnite-api-com");
const config = {
    apikey: "f932b4642b7f68bee1f619a073524a174b03e942498cbaa0626e245b11905e1b",
    language: "en"
};
var Fortnite = new FortniteAPI(config);

client.on("ready", async () => {
    console.log("[" + client.user.username + "]>[INFO]>[STARTED]>[TESTING]");
    var today = new Date();
    var date = `${today.getHours()+2>9?today.getHours()+2:`0${today.getHours()+2}`}:${today.getMinutes()>9?today.getMinutes():`0${today.getMinutes()}`}:${today.getSeconds()>9?today.getSeconds():`0${today.getSeconds()}`} | ${today.getDate()>9?today.getDate():`0${today.getDate()}`}-${today.getMonth()>9?today.getMonth():`0${today.getMonth()+4}`}-${today.getFullYear()}`
    const DevLogReady = `${client.emojis.cache.get("852614405161353217")} **READY UP**\n> \`\`\`\n> PING ➜ ${Math.round(client.ws.ping)}\n> DATE ➜ ${date}\n> \`\`\``;
    client.api.channels('853697844333772820').messages.post({
        type: 1,
        data: {
            content: DevLogReady,
            embed: null,
            components: null
        }
    })
    client.user.setActivity("Invitame :D", { type: "WATCHING" });

    const { generateShop, getShopItems } = require("./shop");
    const { apiKey, language, watermark } = require("./config.json");
    (async () => {
        const items = await getShopItems(apiKey, language);
        await generateShop(items, watermark);
    })()
})

client.on("message", async message => {
    let prefix = "f-";
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd===undefined||!message.content.startsWith(`${prefix}${cmd}`||message.channel.dm)) return;
    var DevLogCommand;
    var s='+';
    try {
        let file = require(`./command/${cmd}.js`);
        file.run(client, message, args, Fortnite);
    } catch (e) {
        message.channel.send('Este comando no existe').then(msg => msg.delete({timeout: 5000}))
        console.log(e.stack),
        s='-';
    } finally {
        var today = new Date();
        var date = `${today.getHours()+2>9?today.getHours()+2:`0${today.getHours()+2}`}:${today.getMinutes()>9?today.getMinutes():`0${today.getMinutes()}`}:${today.getSeconds()>9?today.getSeconds():`0${today.getSeconds()}`} | ${today.getDate()>9?today.getDate():`0${today.getDate()}`}-${today.getMonth()>9?today.getMonth():`0${today.getMonth()+4}`}-${today.getFullYear()}`    
        DevLogCommand = `${client.emojis.cache.get("852613781589852210")} **COMMAND USED**\n> \`\`\`\n> GUILD ➜ ${message.guild.name} | ${message.guild.id}\n> CHANNEL ➜ #${message.channel.name} | ${message.channel.id}\n> USER ➜ @${message.author.tag} | ${message.author.id}\n> DATE ➜ ${date}\n> CMD ➜ ${prefix}${cmd}\n> ARGS ➜ ${args[0]?args.map(a=>`${a}`).join(/ +/g):'No arguments provided'}\n> \`\`\``;
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
                content: DevLogCommand,
                embed: null,
                components: [
                    row
                ]
            }
        }).catch(e => console.log(e))
    }
});

client.on("guildCreate", (guild) => {
    const DevLogGuildCreate = `${client.emojis.cache.get("853735097315622913")} **SERVER JOINED**\n> \`\`\`\n> GUILD ➜ ${guild.name} | ${guild.id}\n> OWNER ➜ $$$ | ${guild.ownerId}\n> \`\`\``;
    //guild.me.setNickName('Feltax')
    console.log('NUEVO SERVIDOR')
    const row = new Discord.MessageActionRow()
    .addComponents(
        new Discord.MessageButton()
            .setLabel('SERVER')
            .setStyle('LINK')
            .setURL(`https://discord.gg/`),
        new Discord.MessageButton()
            .setLabel('LEAVE SERVER')
            .setStyle('DANGER')
            .setCustomID('leave_server')
            .setDisabled(true)
    )
    client.api.channels('853697886335008808').messages.post({
        type: 1,
        data: {
            content: DevLogGuildCreate,
            embed: null,
            components: [
                row
            ]
        }
    }).catch(e => console.log(e))
})

client.on("guildDelete", (guild) => {
    const DevLogGuildDelete = `${client.emojis.cache.get("853742823371178015")} **SERVER LEFT**\n> \`\`\`\n> GUILD ➜ ${guild.name} | ${guild.id}\n> \`\`\``;
    console.log('ME han expulsado de un servidor')
    const row = new Discord.MessageActionRow()
    .addComponents(
        new Discord.MessageButton()
            .setLabel('SERVER')
            .setStyle('LINK')
            .setURL(`https://discord.gg/`)
    )
    client.api.channels('853697886335008808').messages.post({
        type: 1,
        data: {
            content: DevLogGuildDelete,
            embed: null,
            components: [
                row
            ]
        }
    }).catch(e => console.log(e))
})

// LOGIN WITH "FORTNITE API BOT"
//  client.login('Njg1OTE5ODQ1MjMzMTk3MTAw.XmPqog.aWA9QK8J5GLEe3Bgr4EMAgEfxBg').catch(e => console.log(e));
// LOGIN WITH "Feltax"
client.login('NTY4NDM1NjE2MTUzMzM3OTE2.XLiC6w.poqOXAxf5nQD6N8XrOg973u7790').catch(e => console.log(e));