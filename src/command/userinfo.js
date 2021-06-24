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
    let user = message.author;
    var UserName = user.client.user.username;
    console.log(UserName)
    var UserID = user.client.user.id;
    console.log(UserID)
    var UserBOT = user.client.user.bot;
    console.log(UserBOT)
    var UserFlags = user.client.user.flags;
    console.log(UserFlags)
    var UserPresence = user.client.user.presence;
    console.log(UserPresence)
    const UserInfoEmbed = new Discord.MessageEmbed()
        .setTitle(`INFORMACIÓN DE ${UserName}`)
    message.channel.send('El comando no funciona, disculpa las molestias :(')
}