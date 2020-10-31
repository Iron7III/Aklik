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
  Fortnite.CosmeticsNew("es").then(res => {
    console.log(res.data.items[0]);
    const embedAES = new Discord.MessageEmbed()
      .setTitle(`**__COSMETICOS NUEVOS DEL ULTIMO PARCHE__**`)
      .setDescription(
        `<:26A0_color1:769572886662610945> Cosmetics added in 14.40 aren't in the list\n\`\`\`\n${res.data.items.map(t => t.name).join("\n")}\n\`\`\``
      )
      .setColor("#ceedff");
    message.channel.send({ embed: embedAES });
  });
};
