//  ⌚STATUS⌚
//  Comando 100% Completado y Funcional

//  npm Discord
const Discord = require("discord.js");
const client = new Discord.Client({
    disableEveryone: true,
    fetchAllMembers: true
  });

exports.run = async (client, message, args) => {
    const UnbanEmbed = new Discord.MessageEmbed();
    if(!args[0]){
        UnbanEmbed.setDescription(`_Has de mencionar a un usuario o ID._`).setColor('#ED4245')
        message.channel.send({embed: UnbanEmbed})
            .then(m => m.delete({timeout: 5000}))
    } else {
        const UnbanUser = args[0];
        if(!UnbanUser || UnbanUser == message.author.id){
            UnbanEmbed.setDescription(`_Has de mencionar a un usuario o escribir un ID valido._`).setColor('#ED4245')
            message.channel.send({embed: UnbanEmbed})
                .then(m => m.delete({ timeout: 5000 }))
        } else {
            if(!message.member.permissions.has('BAN_MEMBERS')){
                UnbanEmbed.setDescription(`_No tienes permisos para desbanear usuarios._`).setColor('#ED4245')
                    message.channel.send({embed: UnbanEmbed})
                        .then(m => m.delete({ timeout: 5000 }))
            } else {
                message.guild.fetchBans().then(bans=> {
                    if(bans.size == 0){
                        UnbanEmbed.setDescription(`_No hay ningun usuario baneado en el servidor._`).setColor('#ED4245')
                        message.channel.send({embed: UnbanEmbed})
                            .then(m => m.delete({ timeout: 5000 }))
                    } else {
                        let UnbanMember = bans.find(b=>b.user.id==UnbanUser)
                        if(!UnbanMember){
                            UnbanEmbed.setDescription(`_El usuario no existe o no esta baneado._`).setColor('#ED4245')
                            message.channel.send({embed: UnbanEmbed})
                                .then(m => m.delete({ timeout: 5000 }))
                        } else {
                            const UnbanReason = args.slice(1).join(" ")?args.slice(1).join(" "):'No se ha especificado una razón.'
                            message.guild.members.unban(UnbanUser)
                                .then(()=>{
                                    UnbanEmbed.setDescription(`_${UnbanUser} ha sido desbaneado con motivo: \`${UnbanReason}\`_`).setColor('#57F287')
                                    message.channel.send({embed: UnbanEmbed})
                                })
                                .catch(err => {
                                    UnbanEmbed.setDescription(`_No puedo desbanear a este usuario._`).setColor('#ED4245')
                                    message.channel.send({embed: UnbanEmbed})
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