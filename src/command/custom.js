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
    };
    let r = {
        "eu":"Europa",
        "nae":"EE.UU Costa Este",
        "naw":"EE.UU Costa Oeste",
        "oce":"Oceania"
    }
    var c = 'abcdefghijkmnpqrtuvwxyz';
    var p = '';
    var u = message.author.id;
    for (i=0;i<8;i++) p +=c.charAt(Math.floor(Math.random()*c.length)); 
    message.channel.send({embed:Custom})
    .then((msg) => {
        Custom.setTitle('**PARTIDA CUSTOM**')
        Custom.setDescription(`**REGIÓN ➔ **\`${r[args[1]]}\`\n**MODO ➔ **\`${m[args[0]]}\`\n**CODIGO ➔ **\`${p}\`\n**HOST ➔ **@${u}`)
        setTimeout(function(){ 
            msg.edit({embed:Custom})
        }, 3000);
    });
};