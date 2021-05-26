//  npm Discord
const Discord = require("discord.js");
const client = new Discord.Client({
    disableEveryone: true,
    fetchAllMembers: true
});

exports.run = async (client, message, args) => {
    const embed = new Discord.MessageEmbed();
    const user = args[0];
    console.log(user)
    const reason = args[1]?args.slice(1).join(' '):'No hay motivo.';
    if(!user) {
        embed.setDescription(`_Has de mencionar a un usuario o ID._`).setColor('#ED4245')
        message.channel.send({embed: embed})
    } else {
        const member = message.users.cache.get(args[0]);
        console.log(message.guild.members)
        if(!member) {
            embed.setDescription(`_El usuario no esta en el servidor._`).setColor('#ED4245')
            message.channel.send({embed: embed})
        } else {
            user.kick(reason)
            .then(() => {
                    embed.setDescription(`_${member.user.username}#${member.user.discriminator} ha sido kickeado con motivo: \`${reason}\`_`).setColor('#57F287')
                    message.channel.send({embed: embed})
                }
            )
            .catch(err => {
                    embed.setDescription(`_No puedo kickear a este usuario._`).setColor('#ED4245')
                    message.channel.send({embed: embed})
                    console.error(err);
                }
            )
        }
    }
}