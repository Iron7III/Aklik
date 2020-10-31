const Discord = require("discord.js");
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true
});
const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args, Fortnite) => {
  Fortnite.BRShop("es").then(res => {
    const ItemShop_Featured = res.data.featured;
    const ItemShop_Daily = res.data.daily;
    const ItemShop_SpecialFeatured = res.data.specialFeatured;
    const ItemShop_SpecialDaily = res.data.specialDaily;
    const shopDate = res.data.date;
    const ItemShopEmbed = new Discord.MessageEmbed()
      .setTitle(
        `<:1F383_color:768962558299602964> **Fortnite Item Shop**\n<:calender:768962690617573416> **__${shopDate.substring(0,10)}__**`)
      .setDescription(`<:26A0_color1:769572886662610945> Cosmetics added in 14.40 aren't in the list`)
      .setColor("#ff7514");
    if (ItemShop_Featured != null) {
      ItemShopEmbed.addField(
        `<:2B50_color:768962558132092938> **${ItemShop_Featured.name.toUpperCase()}**`,
        `\`\`\`\n${ItemShop_Featured.entries
          .map(t => t.items[0].name)
          .join("\n")}\n\`\`\``,
        true
      );
    }
    if (ItemShop_Daily != null) {
      ItemShopEmbed.addField(
        `<:E0AB_color:769568936077033482> **${ItemShop_Daily.name.toUpperCase()}**`,
        `\`\`\`\n${ItemShop_Daily.entries
          .map(t => t.items[0].name)
          .join("\n")}\n\`\`\``,
        true
      );
    }
    if (ItemShop_SpecialFeatured != null) {
      ItemShopEmbed.addField(
        `**__${ItemShop_SpecialFeatured.name.toUpperCase()}__**`,
        `\`\`\`\n${ItemShop_SpecialFeatured.entries
          .map(t => t.items[0].name)
          .join("\n")}\n\`\`\``,
        true
      );
    }
    if (ItemShop_SpecialDaily != null) {
      ItemShopEmbed.addField(
        `<:1F383_color:768962558299602964> **__${ItemShop_SpecialDaily.name.toUpperCase()}__**`,
        `\`\`\`\n${ItemShop_SpecialDaily.entries
          .map(t => t.items[0].name)
          .join("\n")}\n\`\`\``,
        true
      );
    }
    message.channel.send({ embed: ItemShopEmbed });
  });
};
