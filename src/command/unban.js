//  ⌚STATUS⌚
//  Comando 100% Completado y Funcional

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
    const UnbanEmbed = new Discord.MessageEmbed();
    if(!args[0]){
        UnbanEmbed.setAuthor(`Mention a user or write a valid ID.`,client.emojis.cache.get('861325428513046559').url).setColor('#ED4245')
        message.channel.send({embed: UnbanEmbed})
            .then(msg => client.setTimeout(() => msg.delete(), 5000))
    } else {
        const UnbanUser = args[0];
        if(!UnbanUser || UnbanUser == message.author.id){
            UnbanEmbed.setAuthor(`Mention a user or write a valid ID.`,client.emojis.cache.get('861325428513046559').url).setColor('#ED4245')
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
                            const UnbanReason = args.slice(1).join(/ +/g)?args.slice(1).join(/ +/g):'No se ha especificado una razón.'
                            message.guild.members.unban(UnbanUser)
                                .then(()=>{
                                    UnbanEmbed.setDescription(`_${UnbanUser} ha sido desbaneado con motivo: \`${UnbanReason}\`_`).setColor('#57F287')
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