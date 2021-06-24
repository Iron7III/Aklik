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
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    var UserName = user.client.user.username;
    console.log(UserName)
    var UserID = user.id;
    console.log(UserID)
    var UserBOT = user.bot;
    console.log(UserBOT)
    var UserFlags = user.flags;
    console.log(UserFlags)
    switch(user.presence.status){
        case 'online':
            UserStatus = {
                color: '#3BA55B',
                displayName: `${client.emojis.cache.get("857688314429833237")}`
            };
            break;
            case 'dnd':
                UserStatus = {
                    color: '#EB4245',
                    displayName: `${client.emojis.cache.get("857688314874560562")}`
                };
                break;
                case 'idle':
                    UserStatus = {
                        color: '#F9A61A',
                        displayName: `${client.emojis.cache.get("857688314369802261")}`
                    };
                    break;
                    case 'offline':
                        UserStatus = {
                            color: '#737F8D',
                            displayName: `${client.emojis.cache.get("857688314269401099")}`
                        };
                        break;
    }
    console.log(UserPresence)
    const UserInfoEmbed = new Discord.MessageEmbed()
        .setTitle(`INFORMACIÓN DE ${UserName}`)
        .addField('STATUS',User.Status.displayName,false)
        .setColor(UserStatus.color)
    message.channel.send({embed: UserInfoEmbed})
    message.channel.send('El comando no funciona, disculpa las molestias :(')
}