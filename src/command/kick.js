//  npm Discord
const Discord = require("discord.js");
const client = new Discord.Client({
    disableEveryone: true,
    fetchAllMembers: true
  });

  exports.run = async (client, message, args) => {
    const embed = new Discord.MessageEmbed();
    const user = args[0]||message.mentions.users.first();
    if(user){
        const member = message.guild.member(user);
        if(member){
            if(member){
                member.kick(args[1]?args.slice(1).join(' '):'No hay motivo.')
                .then(()=>{
                        embed.setDescription(`_${member.user.username}#${member.user.discriminator} ha sido kickeado con motivo: \`${args[1]?args.slice(1).join(' '):'No hay motivo.'}\`_`).setColor('#57F287')
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
        } else {
            embed.setDescription(`_El usuario no esta en el servidor._`).setColor('#ED4245')
            message.channel.send({embed: embed})
        }
    } else {
        embed.setDescription(`_Has de mencionar a un usuario o ID._`).setColor('#ED4245')
        message.channel.send({embed: embed})
    }
}