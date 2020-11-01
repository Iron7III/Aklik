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
  Fortnite.AES().then(res => {
    const embedAES = new Discord.MessageEmbed()
      .setTitle(`**__Información AES__**`)
      .addField(`${client.emojis.cache.get("769615338538139679")} **BUILD [\`${res.data.build.substring(19,24)}\`]**`, `\`\`\`fix\n${res.data.build}\n\`\`\``, false)
      .addField(`${client.emojis.cache.get("769615338538139679")} **KEY**`, `\`\`\`fix\n${res.data.mainKey}\n\`\`\``, false)
      .addField(
        `${client.emojis.cache.get("769615338538139679")} **DYNAMIC KEYS [\`${res.data.dynamicKeys.length}\`]**`,
        res.data.dynamicKeys.map(t => `\`\`\`md\n< ${t.pakFilename} >\n${t.key}\n\`\`\``).join("\n"),
        false
      )
      .addField(
        `${client.emojis.cache.get("769568936077033482")} **ACTUALIZADO**`,
        `\`\`\`fix\n${res.data.updated}\n\`\`\``,
        false
      )
      .setColor("#ffef7d");
    message.channel.send({ embed: embedAES });
  });
};
