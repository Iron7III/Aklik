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
  const PingEmbed = new Discord.MessageEmbed()
    .setDescription(`Ping:`)
    .setColor("#98ff98");
  const m = await message.channel.send({embed: PingEmbed});
  const FinalPingEmbed = new Discord.MessageEmbed()
    .addField(`**Ping**`,` \`${m.createdTimestamp-message.createdTimestamp}ms\``,false)
    .setColor("#98ff98");
  m.edit({embed: FinalPingEmbed});
};