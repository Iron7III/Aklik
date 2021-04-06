//  npm Discord
const Discord = require("discord.js");
//  Usuario del Bot de Discord
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true
});

exports.run = async (client, message, args, Fortnite) => {
    if(message.author.id!=='438390132538605589') return;
    //if(message.channel.id!=='712295197580460193') return;
    message.delete()
    const Rules = new Discord.MessageEmbed()
        .setTitle(`**${message.guild.name}**`)
        .setDescription(`Bienvenido/a a esta pequeña comunidad de gente. Este es un servidor para todo usuario de Fortnite Hispanohablante que quiera estar y disfrutar de buenos usuarios. Aqui podras hablar de cualquier tema sin preucuparte de censurarte para evitar sanciones o evitar temas, aqui eres libre, habla y disfruta como quieras!`)
        .setColor('#EF9237')
    const Rules2 = new Discord.MessageEmbed()
        .setTitle(`**REGLAS I INFORMACIÓN**`)
        .setDescription('porfavor funciona :(')
        .setColor('#EF9237')
    const Rules3 = new Discord.MessageEmbed()
        .setTitle(`**CANALES**`)
        .setDescription(`Aqui añadire informacion de los canales.`)
        .setColor('#EF9237')
    const Rules4 = new Discord.MessageEmbed()
        .setTitle(`**ROLES DEL SERVIDOR**`)
        .setDescription(`<@&712296340364853249> **-** Este rol es otorgado a todos los usuarios.\n\n<@&825061928095055894> **-** ¡Mejorando el servidor consseguiras este rol y muchas ventajas!`)
        .setColor('#EF9237')

    message.channel.send(Rules)
    message.channel.send(Rules2)
    message.channel.send(Rules3)
    message.channel.send(Rules4)
}