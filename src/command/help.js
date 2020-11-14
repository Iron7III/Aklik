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
    ConvertedUptime=`${client.uptime} miliseconds`
  } else if(client.uptime < 60000){
    ConvertedUptime=`${client.uptime/1000} seconds`
  } else if(client.uptime < 3600000){
    ConvertedUptime=`${(client.uptime/1000)/60} minutes`
  } else if(client.uptime < 86400000){
    ConvertedUptime=`${((client.uptime/1000)/60)/60} hours`
  } else if(client.uptime < 604800000000){
    ConvertedUptime=`${(((client.uptime/1000)/60)/60)/24} days`
  }
let CommandsArray=[
  ``,
  ``,
  ``,
  ``,
];
let InformationArray=[
  `**UPTIME\n- **\`${ConvertedUptime}\``,
  `**SERVERS\n- **\`${client.guilds.cache.size}\``,
  `**LENGUAJE\n- **\`Node.js\``,
  `**LIBRERIAS\n- **\`discord.js\`\n**- **\`axios\`\n**- **\`express\`\n**- **\`fortnite-api-com\``,
];

const embed = new Discord.MessageEmbed()
  .setTitle(`**${client.user.username} HELP**`)
  .addField(
    `**LISTA DE COMANDOS**`,
    `a`,
    false)
  .addField(
    `**INFORMACIÓN**`,
    `${InformationArray.join(`\n`)}`
  )
message.channel.send({ embed: embed })
console.log(ConvertedUptime)
console.log(client.guilds.cache)
message.channel.send(ConvertedUptime)
}