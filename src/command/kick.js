const Discord = require("discord.js");
const client = new Discord.Client({
    disableEveryone: true,
    fetchAllMembers: true,
    ws: {
        properties: {
            $browser: "Discord Android"
        },
    },
    intents: Discord.Intents.ALL
    //intents: Discord.Intents.NON_PRIVILEGED
});

exports.run = async (client, message, args) => {
    console.log(message.guild.members)
    const embed = new Discord.MessageEmbed();
    if(!args[0]){
        embed.setDescription(`_Has de mencionar a un usuario o ID._`).setColor('#ED4245')
        message.channel.send({embed: embed})
            .then(msg => client.setTimeout(() => msg.delete(), 5000))
    } else {
        let user = message.mentions.users.first() || client.users.resolve(args[0]) || message.guild.members.cache.find(m => m.user.username.toLowerCase() == args[0]) || await client.users.fetch(args[0]);
        if(!user||user.id==message.author.id){
            message.channel.send({embed: embed})
                .then(msg => client.setTimeout(() => msg.delete(), 5000))
        } else {
            if(!message.member.permissions.has('KICK_MEMBERS')){
                embed.setDescription(`_No tienes permisos para kickear usuarios._`).setColor('#ED4245')
                message.channel.send({embed: embed})
                    .then(msg => client.setTimeout(() => msg.delete(), 5000))
            } else {
                const member = message.guild.members.cache.get(user.id);
                console.log(user)
                console.log('________________________________')
                console.log(member)
                if(!member){
                    embed.setDescription(`_El usuario no esta en el servidor._`).setColor('#ED4245')
                    message.channel.send({embed: embed})
                        .then(msg => client.setTimeout(() => msg.delete(), 5000))
                } else {
                    if(!member.kickable){
                        embed.setDescription(`_El usuario no puede ser kickeado._`).setColor('#ED4245')
                        message.channel.send({embed: embed})
                            .then(msg => client.setTimeout(() => msg.delete(), 5000))
                    } else {
                        const reason = args.slice(1).join(' ')?args.slice(1).join(' '):'No se ha especificado una razón.';
                        member.kick(reason)
                            .then(()=>{
                                embed.setDescription(`_${member.user.username}#${member.user.discriminator} ha sido kickeado con motivo: \`${reason}\`_`).setColor('#57F287')
                                message.channel.send({embed: embed})
                            })
                            .catch(err => {
                                embed.setDescription(`_No puedo kickear a este usuario._`).setColor('#ED4245')
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