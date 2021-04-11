//VARIABLES GENERALES
const Discord = require("discord.js");
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true
});
const FortniteAPI = require("fortnite-api-com");
const config = {
    apikey: "f932b4642b7f68bee1f619a073524a174b03e942498cbaa0626e245b11905e1b",
    language: "en"
};
var Fortnite = new FortniteAPI(config);


//EVENTO ready
const guildID = '712022694727647313';
const getApp = (guildID) => {
    const app = client.api.applications(client.user.id)
    if(guildID) {
        app.guilds(guildID)
    }
    return app;
}
client.on("ready", async () => {
    const DevLogChannel=(client.guilds.cache.get('514150100575191040')).channels.cache.get('589422434134917134');
    console.log("[" + client.user.username + "]>[INFO]>[STARTED]>[TESTING]");
    const ready = new Discord.MessageEmbed()
        .setTitle(`CONECTADO`)
        .setColor('RANDOM')
    DevLogChannel.send('<@!438390132538605589>')
    DevLogChannel.send({ embed: ready })
    client.user.setActivity("Invitame :D", { type: "WATCHING" });

    const commands = await getApp(guildID).commands.get()
    console.log(commands)
    
    await getApp(guildID).commands.post({
        data: {
            name: 'ping',
            description: 'Testing slash commands [ping command]'
        }
    })

    await getApp(guildID).commands.post({
        data: {
            name: 'embed',
            description: 'Envia un embed personalizado',
            options: [
                {
                    name: 'Name',
                    description: 'Tu nombre',
                    required: true,
                    type: 3 // string
                },
                {
                    name: 'Age',
                    description: 'Tu edad',
                    required: false,
                    type: 4 // integer
                }
            ]
        }
    })

    client.ws.on('INTERACTION_CREATE', async (interaction) => {
        const { name, options } = interaction.data;
        const command = name.toLowerCase()
        const args = {}
        console.log(options)
        if(options) {
            for(const option of options) {
                const {name, value} = option;
                args[name] = value
            }
        }
        console.log(args)
        if(command === 'ping') {
            reply(interaction, 'pong')
        } else if(command === 'embed') {
            const embed = new Discord.MessageEmbed()
                .setTitle('Soy un embed :D')
            for(const arg in args) {
                const value = args[arg]
                embed.addField(arg, value)
            }
            reply(interaction, embed)
        }
    })
})

const reply = async (interaction, response) => {
    let data = {
        content: response
    }
    if(typeof response === 'object') {
        data = await createAPIMessage(interaction, response)
    }
    client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data,
        },
    })
}
const createAPIMessage = async (interaction, content) => {
    const { data, files } = await Discord.APIMessage().create(
        client.channels.resolve(interaction.channel_id),
        content
    )
        .resolveData()
        .resolveFiles()
    return{ ...data, files }
}

//EVENTO message
client.on("message", async message => {
    let prefix = "f-";
    const args = message.content.slice(prefix.length).trim().split(" ");
    const DevLogChannel=client.channels.cache.get('589422434134917134');
    const cmd = args.shift().toLowerCase();
    if(cmd===undefined||!message.content.startsWith(`${prefix}${cmd}`||message.channel.dm)) return;
    var DevLogMessage;
    var s='+';
    try {
    let file = require(`./command/${cmd}.js`);
        file.run(client, message, args, Fortnite);
    } catch (e) {
        console.log(e.stack),
        s='-';
    } finally {
        DevLogMessage=`\`\`\`md\n[${message.guild.name}](${message.guild.id})\n[#${message.channel.name}](${message.channel.id})\n[@${message.author.tag}](${message.author.id})\n[${cmd.toUpperCase()}] ${s}\n${args.map(a=>`<${a}>`).join(' ')}\n\`\`\``;
        DevLogChannel.send(DevLogMessage);
    }
});

client.on("guildCreate", (guild) => {
    client.channels.cache.get("830421823782256670").send(`NUEVO SERVIDOR: ${guild.name}`)
    console.log('NUEVO SERVIDOR')
})




// TOKEN
client.login('Njg1OTE5ODQ1MjMzMTk3MTAw.XmPqog.aWA9QK8J5GLEe3Bgr4EMAgEfxBg').catch(e => console.log(e));