const Discord = require("discord.js");

exports.run = async (client, message, args, FortniteAPIComClient, FortniteAPIIoClient, {assets}) => {
  Fortnite.AES().then(res => {
    const embedAES = new Discord.MessageEmbed()
      .setTitle(`**AES Information**`)
      .addField(
        `Build [\`${res.data.build.substring(19,24)}\`]`,
        `\`\`\`fix\n${res.data.build}\n\`\`\``,
        false
      )
      .addField(
        `Key`,
        `\`\`\`fix\n${res.data.mainKey}\n\`\`\``,
        false
      )
      .addField(
        `Updated`,
        `\`\`\`fix\n${res.data.updated}\n\`\`\``,
        false
      )
      .setColor("#ffef7d");
    res.data.dynamicKeys.map(d => {
      embedAES.addField(`${d.pakFilename}`,`\`\`\`\n${d.key}\n\`\`\``)
    })
    message.channel.send({content: ' ',embed: embedAES});
  });
};