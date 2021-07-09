const Discord = require("discord.js");
const {assets} = require('../assets.json')

exports.run = async (client, message, args) => {
    const embed = new Discord.MessageEmbed();
    if(!args[0]){
        embed.setAuthor(`Mention a user or write a valid ID.`,assets.mention).setColor('#ED4245')
        message.channel.send({embed: embed})
            .then(msg => client.setTimeout(() => msg.delete(), 5000))
    } else {
        let user = message.mentions.users.first() || client.users.resolve(args[0]) || message.guild.members.cache.find(m => m.user.username.toLowerCase() == args[0]) || await client.users.fetch(args[0]);
        if(!user||user.id==message.author.id){
            message.channel.send({embed: embed})
                .then(msg => client.setTimeout(() => msg.delete(), 5000))
        } else {
            if(!message.member.permissions.has('BAN_MEMBERS')){
                embed.setDescription(`_No tienes permisos para banear usuarios._`).setColor('#ED4245')
                message.channel.send({embed: embed})
                    .then(msg => client.setTimeout(() => msg.delete(), 5000))
            } else {
                const member = message.guild.members.cache.get(user.id);
                if(!member){
                    embed.setDescription(`_El usuario no esta en el servidor._`).setColor('#ED4245')
                    message.channel.send({embed: embed})
                        .then(msg => client.setTimeout(() => msg.delete(), 5000))
                } else {
                    if(!member.bannable){
                        embed.setDescription(`_El usuario no puede ser baneado._`).setColor('#ED4245')
                        message.channel.send({embed: embed})
                            .then(msg => client.setTimeout(() => msg.delete(), 5000))
                    } else {
                        const reason = args.slice(1).join(' ')?args.slice(1).join(' '):'No se ha especificado una razón.';
                        member.ban(reason)
                            .then(()=>{
                                embed.setDescription(`_${member.user.username}#${member.user.discriminator} ha sido baneado con motivo: \`${reason}\`_`).setColor('#57F287')
                                message.channel.send({embed: embed})
                            })
                            .catch(err => {
                                embed.setDescription(`_No puedo banear a este usuario._`).setColor('#ED4245')
                                message.channel.send({embed: embed})
                                    .then(msg => client.setTimeout(() => msg.delete(), 5000))
                                console.error(err);
                            })
                    }
                }
            }
        }
    }
}