//  npm Discord
const Discord = require("discord.js");
const client = new Discord.Client({
    disableEveryone: true,
    fetchAllMembers: true
  });

exports.run = async (client, message, args) => {
    const BanEmbed = new Discord.MessageEmbed();

    const BanReason = args.slice(1).join(" ")?args.slice(1).join(" "):'No se ha especificado una razón.'
    message.guild.ban(args[0])
        .then(()=>{
            BanEmbed.setDescription(`_${member.user.username}#${member.user.discriminator} ha sido baneado con motivo: \`${BanReason}\`_`).setColor('#57F287')
            message.channel.send({embed: BanEmbed})
        })
        .catch(err => {
            BanEmbed.setDescription(`_No puedo banear a este usuario._`).setColor('#ED4245')
            message.channel.send({embed: BanEmbed})
                .then(m => m.delete({ timeout: 5000 }))
            console.error(err);
        })
}