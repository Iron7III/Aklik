//  npm Discord
const Discord = require("discord.js");
//  Usuario del Bot de Discord
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true
});

exports.run = async (client, message, args, Fortnite) => {
    if(message.user.id!=='438390132538605589') return;
    if(message.channel.id!=='712295197580460193') return;
    message.delete()
    const Rules = new Discord.MessageEmbed()
        .setTitle(`**BIENVENIDO A ${message.server.name}**`)
        .setDescription()
        .setColor('#ff0000')
    const Rules2 = new Discord.MessageEmbed()
    let EmbedReglas =
    [
        {
            "properties":
            {
                "title":"RESPETO",
                "description":"Respeta a todos los usuarios y no discrimines a nadie."
            }
        },
        {
            "properties":
            {
                "title":"NSFW",
                "description":"No envies contenido explicito, gore o que pueda herir la sensibilidad de las personas."
            }
        }
    ]
        .setTitle(`**REGLAS**`)
        .setDescription(EmbedReglas.map(r => `**${r.properties.title}**\n${r.properties.description}`).join('\n\n'))
        .setColor('#fa5b06')
    const Rules3 = new Discord.MessageEmbed()
        .setTitle(`**CANALES**`)
        .setDescription()
        .setColor('#faa106')
    const Rules4 = new Discord.MessageEmbed()
        .setTitle(`**ROLES}**`)
        .setDescription()
        .setColor('#fac907')
}