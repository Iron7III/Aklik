//  npm Discord
const Discord = require("discord.js");
const client = new Discord.Client({
    disableEveryone: true,
    fetchAllMembers: true
  });

exports.run = async (client, message, args, Fortnite) => {
    const embed = new Discord.MessageEmbed();
    const user = message.mentions.users.first()||args[0];
    console.log(message.mentions.users.first())
    const member = message.guild.member(user);
    console.log(member)
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
                embed.setDescription(`_${member.user.username}#${member.user.discriminator} ha sido baneado con motivo: \`${args[1]?args.slice(0):'No hay motivo.'}\`_`).setColor('#57F287')
                console.log(args.slice(args[0].length))
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