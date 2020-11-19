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
let Commands=[
  `**INFORMACION / SOPORTE\n- **\`f*help\`\n**- **\`f*ping\``,
  `**FORTNITE\n- **\`f*aes\`\n**- **\`f*map <language | blank>\`\n**- **\`f*shop\`\n**- **\`f*news <gamemode> <language>\`\n**- **\`f*newitems\``,
  `||PlaceHolder||`,
  `||PlaceHolder||`,
];

const embed = new Discord.MessageEmbed()
  .setTitle(`**${client.user.username} HELP**`)
  .addField(
    `**LISTA DE COMANDOS**`,
    `${Commands.join(`\n\n`)}`,
    false)
message.channel.send({ embed: embed })
}