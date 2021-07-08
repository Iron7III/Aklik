const Discord = require("discord.js");
const {assets} = require('../assets.json')

exports.run = async (client, message, args) => {
    const UnbanEmbed = new Discord.MessageEmbed();
    if(!args[0]){
        UnbanEmbed.setAuthor(`Mention a user or write a valid ID.`,client.emojis.cache.get('862637092910792726').url).setColor('#ED4245')
        message.channel.send({embed: UnbanEmbed})
            .then(msg => client.setTimeout(() => msg.delete(), 5000))
    } else {
        const UnbanUser = args[0];
        if(!UnbanUser || UnbanUser == message.author.id){
            UnbanEmbed.setAuthor(`Mention a user or write a valid ID.`,client.emojis.cache.get('862637092910792726').url).setColor('#ED4245')
            message.channel.send({embed: UnbanEmbed})
                .then(msg => client.setTimeout(() => msg.delete(), 5000))
        } else {
            if(!message.member.permissions.has('BAN_MEMBERS')){
                UnbanEmbed.setDescription(`_No tienes permisos para desbanear usuarios._`).setColor('#ED4245')
                    message.channel.send({embed: UnbanEmbed})
                        .then(msg => client.setTimeout(() => msg.delete(), 5000))
            } else {
                message.guild.fetchBans().then(bans=> {
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
                            const UnbanReason = args.slice(1).join(/ +/g)?args.slice(1).join(/ +/g):'Any reason'
                            message.guild.members.unban(UnbanUser)
                                .then(()=>{
                                    UnbanEmbed.setDescription(`_${UnbanUser} ha sido desbaneado con motivo: \`${UnbanReason}\`_`).setColor('#57F287')
                                    UnbanEmbed.setAuthor(`${UnbanUser} Unbanned`,client.emojis.cache.get('861325114694696960').url).setDescription(`\`${UnbanReason}\``).setColor('#57F287')
                                    message.channel.send({embed: UnbanEmbed})
                                })
                                .catch(err => {
                                    UnbanEmbed.setAuthor(`I can't unban this user.`,client.emojis.cache.get('861325114694696960').url).setColor('#ED4245')
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