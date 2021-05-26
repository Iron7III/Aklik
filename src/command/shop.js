const Discord = require("discord.js");
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true
});

exports.run = async (client, message, args, Fortnite) => {
  Fortnite.BRShop("es").then(res => {
    console.log(res)
    const ItemShop = new Discord.MessageEmbed()
      .setTitle(
        `**Fortnite Item Shop**\n**${res.data.date.substring(0,10)}**`)
        .setColor('#ff5e00');
    if (res.data.featured != null) {
      ItemShop.addField(
        `${client.emojis.cache.get("768962558132092938")} **${res.data.featured.name.toUpperCase()}**`,
        `\`\`\`md\n${res.data.featured.entries.map(t => `< ⓥ ${t.finalPrice} > ${t.items[0].name}`).join("\n")}\n\`\`\``,
        false
      );
    }
    if (res.data.daily != null) {
      ItemShop.addField(
        `${client.emojis.cache.get("769568936077033482")} **${res.data.daily.name.toUpperCase()}**`,
        `\`\`\`md\n${res.data.daily.entries.map(t => `< ⓥ ${t.finalPrice} > ${t.items[0].name}`).join("\n")}\n\`\`\``,
        false
      );
    }
    if (res.data.specialFeatured != null) {
      ItemShop.addField(
        `🎄 **${res.data.specialFeatured.name!=null?res.data.specialFeatured.name.toUpperCase():"OFERTAS ESPECIALES"}**`,
        `\`\`\`md\n${res.data.specialFeatured.entries.map(t => `< ⓥ ${t.finalPrice} > ${t.items[0].name}`).join("\n")}\n\`\`\``,
        false
      );
    }
    if (res.data.specialDaily != null) {
      ItemShop.addField(
        `🎄 **${res.data.specialDaily.name.toUpperCase()}**`,
        `\`\`\`md\n${res.data.specialDaily.entries.map(t => `< ⓥ ${t.finalPrice} > ${t.items[0].name}`).join("\n")}\n\`\`\``,
        false
      );
    }
    const test = new Discord.MessageEmbed()
      .setTitle('awdaw')
      .setImage('attachment://shop-cataba.jpg')
      .setColor('RANDOM')
    message.channel.send({embed: test})

    const attach = new Discord.MessageAttachment(`shop-cataba.jpg`)
    message.channel.send(attach)
  });
};
