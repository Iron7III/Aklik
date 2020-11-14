const Discord = require("discord.js");
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true
});
const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args, Fortnite) => {
if(message.author.id!==438390132538605589) return;
if(!args[0]) return;
client.user.setActivity(args[0], { type: "WATCHING" });
message.channel.send(`ESTADO CAMBIADO CORRECTAMENTE`);
}