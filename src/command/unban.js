//  npm Discord
const Discord = require("discord.js");
const client = new Discord.Client({
    disableEveryone: true,
    fetchAllMembers: true
  });

exports.run = async (client, message, args) => {
    const embed = new Discord.MessageEmbed();
    if(!args[0]){
        embed.setDescription(`_Has de mencionar a un usuario o ID._`).setColor('#ED4245')
        message.channel.send({embed: embed})
            .then(m => m.delete({timeout: 5000}))
    } else {
        const member = args[0];
        if(!member || member == message.author.id){
            embed.setDescription(`_Has de mencionar a un usuario o ID._`).setColor('#ED4245')
            message.channel.send({embed: embed})
                .then(m => m.delete({ timeout: 5000 }))
        } else {
            if(!message.member.permissions.has('BAN_MEMBERS')){
                embed.setDescription(`_No tienes permisos para desbanear usuarios._`).setColor('#ED4245')
                    message.channel.send({embed: embed})
                        .then(m => m.delete({ timeout: 5000 }))
            } else {
                message.guild.fetchBans().then(bans=> {
                    if(bans.size == 0){
                        embed.setDescription(`_No hay ningun usuario baneado en el servidor._`).setColor('#ED4245')
                        message.channel.send({embed: embed})
                            .then(m => m.delete({ timeout: 5000 }))
                    } else {
                        let user = bans.find(b=>b.user.id==member)
                        if(!user){
                            embed.setDescription(`_El usuario no existe o no esta baneado._`).setColor('#ED4245')
                            message.channel.send({embed: embed})
                                .then(m => m.delete({ timeout: 5000 }))
                        } else {
                            const reason = args.slice(1).join(" ")?args.slice(1).join(" "):'No se ha especificado una razón.'
                            message.guild.members.unban(member.id)
                                .then(()=>{
                                    embed.setDescription(`_${member.user.username}#${member.user.discriminator} ha sido desbaneado con motivo: \`${args[1]?args.slice(1).join(' '):'No hay motivo.'}\`_`).setColor('#57F287')
                                    message.channel.send({embed: embed})
                                })
                                .catch(err => {
                                    embed.setDescription(`_No puedo desbanear a este usuario._`).setColor('#ED4245')
                                    message.channel.send({embed: embed})
                                        .then(m => m.delete({ timeout: 5000 }))
                                    console.error(err);
                                })
                        }
                    }
                })  
            }
        }
    }
}