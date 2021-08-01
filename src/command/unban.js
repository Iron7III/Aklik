const Discord = require("discord.js");

exports.run = async (client, message, args, FortniteAPIComClient, FortniteAPIIoClient, {assets}) => {
    const UnbanEmbed = new Discord.MessageEmbed();
    if(!args[0]){
        UnbanEmbed.setAuthor(`Mention a user or write a valid ID.`,assets.mention).setColor('#ED4245')
        message.channel.send({embed: UnbanEmbed})
            .then(msg => client.setTimeout(() => msg.delete(), 5000))
    } else {
        const UnbanUser = args[0];
        if(!UnbanUser || UnbanUser == message.author.id){
            UnbanEmbed.setAuthor(`Mention a user or write a valid ID.`,assets.mention).setColor('#ED4245')
            message.channel.send({embed: UnbanEmbed})
                .then(msg => client.setTimeout(() => msg.delete(), 5000))
        } else {
            if(!message.member.permissions.has('BAN_MEMBERS')){
                UnbanEmbed.setDescription(`_No tienes permisos para desbanear usuarios._`).setColor('#ED4245')
                    message.channel.send({embed: UnbanEmbed})
                        .then(msg => client.setTimeout(() => msg.delete(), 5000))
            } else {
                message.guild.bans.fetch().then(bans=> {
                    if(bans.size == 0){
                        UnbanEmbed.setDescription(`_No hay ningun usuario baneado en el servidor._`).setColor('#ED4245')
                        message.channel.send({embed: UnbanEmbed})
                            .then(msg => client.setTimeout(() => msg.delete(), 5000))
                    } else {
                        let UnbanMember = bans.find(b=>b.user.id==UnbanUser)
                        if(!UnbanMember){
                            UnbanEmbed.setDescription(`_El usuario no existe o no esta baneado._`).setColor('#ED4245')
                            message.channel.send({embed: UnbanEmbed})
                                .then(msg => client.setTimeout(() => msg.delete(), 5000))
                        } else {
                            const UnbanReason = args.slice(1).join(' ')?args.slice(1).join(' '):'Any reason'
                            message.guild.members.unban(UnbanUser)
                                .then(()=>{
                                    UnbanEmbed.setAuthor(`${UnbanUser} Unbanned`,assets.success).setDescription(`\`${UnbanReason}\``).setColor('#57F287')
                                    message.channel.send({embed: UnbanEmbed})
                                })
                                .catch(err => {
                                    UnbanEmbed.setAuthor(`I can't unban this user.`,assets.error).setColor('#ED4245')
                                    message.channel.send({embed: UnbanEmbed})
                                        .then(msg => client.setTimeout(() => msg.delete(), 5000))
                                    console.error(err);
                                })
                        }
                    }
                })  
            }
        }
    }
}