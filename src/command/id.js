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
  Fortnite.CosmeticsSearchByID(args[0], "es").then(res => {
    console.log(res);
    const embed = new Discord.MessageEmbed()
      .setTitle(`**__${res.data.name}__**`)
      .addField(
        `**DESCRIPCIÓN**`,
        `\`\`\`${res.data.description}\`\`\``,
        false
      )
      .addField(
        `**TIPO**`,
        `\`\`\`${res.data.type.displayValue}\`\`\``,
        true
      )
      .addField(
        `**Rareza**`,
        `\`\`\`${res.data.rarity.displayValue}\`\`\``,
        false
      )
      .addField(
        `**INTRODUCIDO**`,
        `\`\`\`CAPITULO ${res.data.introduction.chapter} | TEMPORADA ${res.data.introduction.season}\`\`\``,
        false
      )
      .addField(
        `**PATH**`,
        `\`\`\`${res.data.path}\`\`\``,
        false
      )
    if (res.data.set != null) {
      embed.addField(
        `**CONJUNTO**`,
        `\`\`\`${res.data.set.text}\`\`\``,
        false
      )
    } else if (res.data.set == null) {
      embed.addField(
        `**CONJUNTO**`,
        `\`\`\`No tiene\`\`\``,
        false
      )
    }
    if (res.data.images.featured != null) {
      embed.setImage(res.data.images.featured);
    } else if (res.data.images.featured == null) {
      embed.setImage(res.data.images.icon);
    }
    message.channel.send({ embed: embed });
  });
};