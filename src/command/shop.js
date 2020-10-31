const Discord = require("discord.js");
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true
});
const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args, Fortnite) => {
  Fortnite.BRShop("es").then(res => {
    const shopDate = res.data.date;
    const ItemShopEmbed = new Discord.MessageEmbed()
      .setTitle(
        `<:1F383_color:768962558299602964> **Fortnite Item Shop**\n<:calender:768962690617573416> **__${shopDate.substring(0,10)}__**`)
      .setDescription(`<:26A0_color1:769572886662610945> Cosmetics added in 14.40 aren't in the list`)
      .setColor("#ff7514");
    if (res.data.featured != null) {
      ItemShopEmbed.addField(
        `<:2B50_color:768962558132092938> **${res.data.featured.name.toUpperCase()}**`,
        `\`\`\`\n${res.data.featured.entries.map(t => t.items[0].name).join("\n")}\n\`\`\``,
        false
      );
    }
    if (res.data.daily != null) {
      ItemShopEmbed.addField(
        `<:E0AB_color:769568936077033482> **${res.data.daily.name.toUpperCase()}**`,
        `\`\`\`\n${res.data.daily.entries.map(t => t.items[0].name).join("\n")}\n\`\`\``,
        false
      );
    }
    if (res.data.specialFeatured != null) {
      ItemShopEmbed.addField(
        `**__${res.data.specialFeatured.name.toUpperCase()}__**`,
        `\`\`\`\n${res.data.specialFeatured.entries.map(t => t.items[0].name).join("\n")}\n\`\`\``,
        false
      );
    }
    if (res.data.specialDailyy != null) {
      ItemShopEmbed.addField(
        `<:1F383_color:768962558299602964> **__${res.data.specialDaily.name.toUpperCase()}__**`,
        `\`\`\`\n${res.data.specialDaily.entries.map(t => t.items[0].name).join("\n")}\n\`\`\``,
        false
      );
    }
    message.channel.send({ embed: ItemShopEmbed });
  });
};
