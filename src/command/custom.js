//  npm Discord
const Discord = require("discord.js");
//  Usuario del Bot de Discord
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true
});

exports.run = async (client, message, args, Fortnite) => {
    const Custom = new Discord.MessageEmbed()
        .setTitle('**GENERANDO CODIGO PARA CUSTOM...**')
        .setColor('#3498db')
    let m = {
        "solo":"Solitario",
        "duo":"Duos",
        "trio":"Trios"
    }
    var c = 'abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789';
    var p = '';
    for (i=0;i<8;i++) p +=c.charAt(Math.floor(Math.random()*c.length)); 
    message.channel.send({embed:Custom})
        .then((msg) => {
            Custom.setTitle('**CUSTOM**')
            Custom.setDescription(`**MODO :: **\`${m[args[0]]}\`\n**CODIGO :: **\`${p}\``)
            msg.edit({embed:Custom})
        })
}