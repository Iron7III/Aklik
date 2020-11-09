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
   /* const embedAES = new Discord.MessageEmbed()
      .setTitle('xd')
    message.channel.send(client.uptime)*/
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
console.log(ConvertedUptime)
console.log('\x1b[34mEsto estara de color azul\x1b[0m y esto estara normal')
}