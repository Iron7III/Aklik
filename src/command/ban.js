//  npm Discord
const Discord = require("discord.js");

exports.run = async (client, message, args, Fortnite) => {
    const embed = new Discord.MessageEmbed();
    const user = message.mentions.users.first()||args[0];
    const member = message.guild.member(user.id);
    if(!user){
        embed.setDescription(`_Has de mencionar a un usuario o ID._`).setColor('#ED4245')
        message.channel.send({embed: embed})
    }else
    if(!member){
        embed.setDescription(`_El usuario no esta en el servidor._`).setColor('#ED4245')
        message.channel.send({embed: embed})
    }else
    if(member){
        member.ban(
            {
                reason: args[1]?message.content.slice(args[0]):'No hay motivo.'
            }
        )
        .then(()=>{
                embed.setDescription(`_${user.tag} ha sido baneado con motivo: \`${args[1]?message.content.slice(args[0]):'No hay motivo.'}\`_`).setColor('#57F287')
                message.channel.send({embed: embed})
            }
        )
        .catch(err => {
                embed.setDescription(`_No puedo banear a este usuario._`).setColor('#ED4245')
                message.channel.send({embed: embed})
                console.error(err);
            }
        )
    }
}