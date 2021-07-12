//  ⌚STATUS⌚
//  Comando no funcional debido a la falta de Privileged Intents
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    var msg = await client.channels.cache.get('859212246499590144');
    msg.threads.create({
        name: 'JOINED GUILDS',
        autoArchiveDuration: 10080,
        reason: 'Needed a separate thread for log.'
    })
}