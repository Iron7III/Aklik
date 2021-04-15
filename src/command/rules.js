//  npm Discord
const Discord = require("discord.js");
//  Usuario del Bot de Discord
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true
});

exports.run = async (client, message, args) => {
    if(message.author.id!=='438390132538605589') return;
    //if(message.channel.id!=='712295197580460193') return;
    message.delete()
    const Rules = new Discord.MessageEmbed()
        .setTitle(`**${message.guild.name}**`)
        .setDescription(`**Bienvenido/a a esta pequeña comunidad de gente. Aqui podras hablar de cualquier tema sin tener que censurarte, aqui eres libre, habla y disfruta como quieras!**`)
        .setColor('#EF9237')
    const Rules2 = new Discord.MessageEmbed()
        .setTitle(`**REGLAS I INFORMACIÓN**`)
        .setDescription('**:warning: - Estas reglas son una base y puedes ser sancionado por otros motivos no nombrados a continuacion, se racional a la hora de actuar y no causes problemas. Tambien añadir que al ser un servidor para pasar el rato y divertirse, a la minima seras sancionado si no mantienes un buen ambiente.**')
        .addField('**1# - RESPETO**','**Respeta a todos los usuarios del servidor y no discrimines a nadie por ningun motivo. Tampoco hables de temas personales de otra persona o que afecten a alguien.**',false)
        .addField('**2# - CANALES**','**Usa los canales correctamente, evita usar comandos fuera de sus propios canales y no hagas flood con ellos.**',false)
        .setColor('#EF9237')
    const Rules3 = new Discord.MessageEmbed()
        .setTitle(`**CANALES**`)
        .setDescription(`<testing>`)
        .setColor('#EF9237')
    const Rules4 = new Discord.MessageEmbed()
        .setTitle(`**ROLES DEL SERVIDOR**`)
        //.setDescription(`<@&712296340364853249> **-** Este rol es otorgado a todos los usuarios.\n\n<@&825061928095055894> **-** ¡Mejorando el servidor consseguiras este rol y muchas ventajas!`)
        .addField(`${client.emojis.cache.get("832275998950031370")} **- MIEMBRO**`, `Todos los usuarios tienen este rol y te proporciona acceso al uso del servidor.`)
        .addField(`${client.emojis.cache.get("832275998950031370")} **- LLAMA REPORTERA**`, `Los usuarios con este rol tienen permisos para publicar noticias en sus respectivos canales.`)
        .addField(`${client.emojis.cache.get("832275355254915123")} **- LLAMA HONORIFICA**`, `Este rol le pertenece a los usuarios que son parte del Staff de Fortnite Hispanohablante.`)
        .addField(`${client.emojis.cache.get("832268444682027009")} **- NITRO BOOSTER**`, `¡Mejora el servidor y disfruta de este rol y muchas otras cosas!`)
        .addField(`${client.emojis.cache.get("832275664131981313")} **- LLAMA MITICA**`, `Son los maximos Administradores del servidor.`)
        .setColor('#EF9237')

    message.channel.send(Rules)
    message.channel.send(Rules2)
    message.channel.send(Rules3)
    message.channel.send(Rules4)
}