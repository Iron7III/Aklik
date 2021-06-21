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
            .then(m => m.delete({timeout: 5000}))
    } else {
        let user = message.mentions.members.first() || message.guild.members.resolve(args[0]) || message.guild.members.cache.find(m => m.user.username.toLowerCase() == args[0]) || await client.users.fetch(args[0]);
        if(!user||user.id==message.author.id){
            message.channel.send({embed: embed})
                .then(m => m.delete({timeout: 5000}))
        } else {
            if(!message.member.permissions.has('KICK_MEMBERS')){
                embed.setDescription(`_No tienes permisos para kickear usuarios._`).setColor('#ED4245')
                message.channel.send({embed: embed})
                    .then(m => m.delete({ timeout: 5000 }))
            } else {
                const member = message.guild.member(user);
                if(!member){
                    embed.setDescription(`_El usuario no esta en el servidor._`).setColor('#ED4245')
                    message.channel.send({embed: embed})
                        .then(m => m.delete({ timeout: 5000 }))
                } else {
                    if(!member.kickable){
                        embed.setDescription(`_El usuario no puede ser kickeado._`).setColor('#ED4245')
                        message.channel.send({embed: embed})
                            .then(m => m.delete({ timeout: 5000 }))
                    } else {
                        const reason = args.slice(1).join(/ +/g)?args.slice(1).join(/ +/g):'No se ha especificado una razón.';
                        message.guild.member(member).kick(reason)
                            .then(()=>{
                                embed.setDescription(`_${member.user.username}#${member.user.discriminator} ha sido kickeado con motivo: \`${args[1]?args.slice(1).join(/ +/g):'No hay motivo.'}\`_`).setColor('#57F287')
                                message.channel.send({embed: embed})
                            })
                            .catch(err => {
                                embed.setDescription(`_No puedo kickear a este usuario._`).setColor('#ED4245')
                                message.channel.send({embed: embed})
                                    .then(m => m.delete({ timeout: 5000 }))
                                console.error(err);
                            })
                    }
                }
            }
        }
    }
}