//  npm Discord
const Discord = require("discord.js");
//  Usuario del Bot de Discord
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true
});

exports.run = async (client, message, args, Fortnite) => {
    const embed = new Discord.MessageEmbed();
    const user = message.mentions.users.first()||args[0];
    const member = message.guild.member(user);
    if(!user){
        embed.setDescription(`_Has de mencionar a un usuario o ID._`).setColor('#ED4245')
        message.channel.send({embed: embed})
    }
    if(!member){
        embed.setDescription(`_El usuario no esta en el servidor._`).setColor('#ED4245')
        message.channel.send({embed: embed})
    }
    if(member){
        member.ban(
                {
                reason: args[1]?args[1]:'No hay motivo.'
                }
            )
            .then(()=>{
                embed.setDescription(`_${user.tag} ha sido baneado con motivo: \`${args[1]?args[1]:'No hay motivo.'}\`_`).setColor('#ED4245')
                message.channel.send({embed: embed})
            }
        )
    }
}