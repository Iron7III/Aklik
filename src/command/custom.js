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
        .setTitle('**𝗚𝗘𝗡𝗘𝗥𝗔𝗡𝗗𝗢 𝗖𝗢𝗗𝗜𝗚𝗢 𝗣𝗔𝗥𝗔 𝗣𝗔𝗥𝗧𝗜𝗗𝗔 𝗖𝗨𝗦𝗧𝗢𝗠...**')
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
        "oce":"Oceania",
        "br":"Brasil"
    }
    var c = 'abcdefghijkmnpqrtuvwxyz';
    var p = `${args[0]}`;
    for (i=0;i<3;i++) p +=c.charAt(Math.floor(Math.random()*c.length)); 
    message.channel.send({embed:Custom})
    .then((msg) => {
        Custom.setTitle('**𝗣𝗔𝗥𝗧𝗜𝗗𝗔 𝗖𝗨𝗦𝗧𝗢𝗠**')
        Custom.setDescription(`**REGIÓN ➔ **\`${r[args[1]]}\`\n**MODO ➔ **\`${m[args[0]]}\`\n**CODIGO ➔ **\`${p}\`\n**HOST ➔ **<@${u}>`)
        Custom.addField(`**REGIÓN ➜**`, `\`\`\`${r[args[1]]}\`\`\``)
        Custom.addField(`**MODO DE JUEGO ➜**`, `\`\`\`${m[args[0]]}\`\`\``)
        Custom.addField(`**CÓDIGO ➜**`, `\`\`\`${p}\`\`\``)
        Custom.addField(`**HOST ➜**`, `\`\`\`<@${message.author.username}>\`\`\``)
        setTimeout(function(){ 
            msg.edit({embed:Custom})
        }, 3000);
    });
};