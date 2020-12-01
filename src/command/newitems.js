//  npm Discord
const Discord = require("discord.js");
//  Usuario del Bot de Discord
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true
});

exports.run = async (client, message, args, Fortnite) => {
  Fortnite.CosmeticsNew("es").then(res => {
    console.log(res.data.items[0]);
    const embedAES = new Discord.MessageEmbed()
      .setTitle(`**__COSMETICOS NUEVOS DEL ULTIMO PARCHE__**`)
      .addField(`**COSMETICS [NAME]**`,`\`\`\`\n${res.data.items.map(t => `${t.name}`).join("\n")}\n\`\`\``,false)
      .addField(`COSMETICS [ID]`,`\`\`\`\n${res.data.items.map(t => `${t.id}`).join("\n")}\n\`\`\``,false)
      .setColor("#ceedff");
    message.channel.send({ embed: embedAES });
  });
};