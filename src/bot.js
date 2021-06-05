//VARIABLES GENERALES
const Discord = require("discord.js");
const client = new Discord.Client({
    disableEveryone: true,
    fetchAllMembers: true,
    ws: {
        properties: {
            $browser: "Discord Android"
        },
        intents: Discord.Intents.NON_PRIVILEGED
    }
});
const FortniteAPI = require("fortnite-api-com");
const config = {
    apikey: "f932b4642b7f68bee1f619a073524a174b03e942498cbaa0626e245b11905e1b",
    language: "en"
};
var Fortnite = new FortniteAPI(config);

//ready
client.on("ready", async () => {
    const DevLogChannel=(client.guilds.cache.get('514150100575191040')).channels.cache.get('589422434134917134');
    console.log("[" + client.user.username + "]>[INFO]>[STARTED]>[TESTING]");
    const ready = new Discord.MessageEmbed()
        .setTitle(`CONECTADO`)
        .setColor('RANDOM')
    DevLogChannel.send('<@!438390132538605589>')
    DevLogChannel.send({ embed: ready })
    client.user.setActivity("Invitame :D", { type: "WATCHING" });

    const { generateShop, getShopItems } = require("./shop");
    const { apiKey, language, watermark } = require("./config.json");

    (async () => {
        const items = await getShopItems(apiKey, language);
        await generateShop(items, watermark);
    })()
})

//EVENTO message
client.on("message", async message => {
    let prefix = "f-";
    const args = message.content.slice(prefix.length).trim().split(" ");
    const DevLogChannel=client.channels.cache.get('589422434134917134');
    const cmd = args.shift().toLowerCase();
    if(cmd===undefined||!message.content.startsWith(`${prefix}${cmd}`||message.channel.dm)) return;
    var DevLogCommand;
    var s='+';
    try {
    let file = require(`./command/${cmd}.js`);
        file.run(client, message, args, Fortnite);
    } catch (e) {
        message.channel.send('Este comando no existe').then(msg => {msg.delete(5000)})
        console.log(e.stack),
        s='-';
    } finally {
        DevLogCommand = `**COMMAND USED**\n> \`\`\`\n> GUILD ➧ ${message.guild.name} | ${message.guild.id}\n> CHANNEL ➧ #${message.channel.name} | ${message.channel.id}\n> USER ➧ @${message.author.tag} | ${message.author.id}\n> \n> CMD ➧ ${prefix}${cmd}\n> ARGS ➧ ${args?args.map(a=>`${a}`).join(' '):'There is no args.'}\n> \`\`\``;
        DevLogChannel.send(DevLogCommand);
    }
});

//EVENTO guildCreate
client.on("guildCreate", (guild) => {
    const DevLogGuildCreate = `\`\`\`SERVER ADDED\`\`\`\n**NAME ➧ **\`${guild.name}\`** | **\`${guild.id}\`\n**OWNER ➧ **\`@${guild.owner.displayName}\`** | **\`${guild.ownerId}\`\n**Region ➧ **\`${guild.region}\`\n**Members ➧ **\`${guild.members.size}\``;
    client.channels.cache.get("830421823782256670").send(DevLogGuildCreate)
    guild.me.setNickName('Feltax')
    console.log('NUEVO SERVIDOR')
})

//EVENTO guildDelete
client.on("guildDelete", (guild) => {
    client.channels.cache.get("830421823782256670").send(`ME han expulsado de un servidor: ${guild.name}`)
    console.log('ME han expulsado de un servidor')
})

// TOKEN
client.login('Njg1OTE5ODQ1MjMzMTk3MTAw.XmPqog.aWA9QK8J5GLEe3Bgr4EMAgEfxBg').catch(e => console.log(e));