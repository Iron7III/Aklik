//  npm Discord
const Discord = require("discord.js");
//  Usuario del Bot de Discord
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true
});
// {MessageEmbed}
const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args, Fortnite) => {
  console.log(client.uptime)
  var ConvertedUptime;
  if(client.uptime < 1000){
    ConvertedUptime=`${(client.uptime).toFixed(2)} miliseconds`
  } else if(client.uptime < 60000){
    ConvertedUptime=`${(client.uptime/1000).toFixed(2)} seconds`
  } else if(client.uptime < 3600000){
    ConvertedUptime=`${(client.uptime/1000/60).toFixed(2)} minutes`
  } else if(client.uptime < 86400000){
    ConvertedUptime=`${(client.uptime/1000/60/60).toFixed(2)} hours`
  } else if(client.uptime < 604800000000){
    ConvertedUptime=`${(client.uptime/1000/60/60/24).toFixed(2)} days`
  }
let CommandsArray=[
  ``,
  ``,
  ``,
  ``,
];
let InformationArray=[
  `${client.emojis.cache.get("769568936077033482")} **UPTIME\n- **\`${ConvertedUptime}\``,
  `${client.emojis.cache.get("768962558144938014")} **SERVERS\n- **\`${client.guilds.cache.size}\``,
  `**LENGUAJE\n- **\`Node.js\` ${client.emojis.cache.get("777182228987772958")}`,
  `${client.emojis.cache.get("768962690508783646")} **LIBRERIAS\n- **\`discord.js\` ${client.emojis.cache.get("777189460655341600")}\n**- **\`axios\` ${client.emojis.cache.get("777189460655341600")}\n**- **\`express\` ${client.emojis.cache.get("777189460655341600")}\n**- **\`fortnite-api-com\` ${client.emojis.cache.get("777189460655341600")}`,
];

const embed = new Discord.MessageEmbed()
  .setTitle(`**${client.user.username} HELP**`)
  .addField(
    `**LISTA DE COMANDOS**`,
    `a`,
    false)
  .addField(
    `**INFORMACIÓN**`,
    `${InformationArray.join(`\n\n`)}`
  )
message.channel.send({ embed: embed })
console.log(ConvertedUptime)
console.log(client.guilds.cache)
message.channel.send(ConvertedUptime)
}