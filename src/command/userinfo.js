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
    let User = client.guilds.cache.get(message.guild.id).members.cache.get(args[0]);
    console.log(User)
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
    console.log(UserPresence)
    const UserInfoEmbed = new Discord.MessageEmbed()
        .setTitle(`INFORMACIÓN DE ${UserName}`)
        .addField('STATUS',UserStatus[User.user.presence.status].displayName,false)
        .setColor(UserStatus[User.user.presence.status].color)
    message.channel.send({embed: UserInfoEmbed})
    message.channel.send('El comando no funciona, disculpa las molestias :(')
}