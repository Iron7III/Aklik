//  npm Discord
const Discord = require("discord.js");
//  Usuario del Bot de Discord
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true
});

exports.run = async (client, message, args, Fortnite) => {
    message.delete()
    const Custom = new Discord.MessageEmbed()
        .setTitle('**GENERANDO CODIGO PARA PARTIDA CUSTOM...**')
        .setColor('#3498db')
    let m = {
        "solo":"Solitario",
        "duo":"Duos",
        "trio":"Trios"
    }
    var c = 'abcdefghijkmnpqrtuvwxyz';
    var p = '';
    for (i=0;i<8;i++) p +=c.charAt(Math.floor(Math.random()*c.length)); 
    message.channel.send({embed:Custom})
        .setTimeout(() => {
            Custom.setTitle('**PARTIDA CUSTOM**')
            Custom.setDescription(`**MODO :: **\`${m[args[0]]}\`\n**CODIGO :: **\`${p}\``)
            setInterval(()=>{
                msg.edit({embed:Custom})
            },3000)
        })
}