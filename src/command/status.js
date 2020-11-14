const Discord = require("discord.js");
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true
});
const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args, Fortnite) => {
if(!args[0]) return;
client.user.setActivity(args[0], { type: "WATCHING" });
message.channel.send(`ESTADO CAMBIADO CORRECTAMENTE`);
}