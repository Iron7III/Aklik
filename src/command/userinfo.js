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
    let member = args[0]?message.channel.guild.members.cache.get(args[0]):message.author;
    console.log(member)
    console.log(message.author.presence.status)
    var Tag = `${member.username}#${member.discriminator}`;
    var ID = member.id;
    var Status = member.presence.status;
    console.log(Status);
    var UserStatus = {
        'online': {
            color: '#3BA55B',
            displayName: `${client.emojis.cache.get("857688314429833237")} Conectado`
        },
        'dnd': {
            color: '#EB4245',
            displayName: `${client.emojis.cache.get("857688314874560562")} No molestar`
        },
        'idle': {
            color: '#F9A61A',
            displayName: `${client.emojis.cache.get("857688314369802261")} Ausente`
        },
        'offline': {
            color: '#737F8D',
            displayName: `${client.emojis.cache.get("857688314269401099")} Desconectado`
        }
    }
    const UserInfoEmbed = new Discord.MessageEmbed()
        .setTitle(`INFORMACIÓN DE ${Tag}`)
        .addField('STATUS',UserStatus[message.author.presence.status].displayName,false)
        .setColor(UserStatus[message.author.presence.status].color)
    message.channel.send({embed: UserInfoEmbed})
    message.channel.send('El comando no funciona, disculpa las molestias :(')
}