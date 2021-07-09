const Discord = require("discord.js");
const client = new Discord.Client({
    disableEveryone: true,
    fetchAllMembers: true,
    ws: {
        properties: {
            $browser: "Discord Android"
        },
    },
    intents: Discord.Intents.ALL
    //intents: Discord.Intents.NON_PRIVILEGED
});

exports.run = async (client, message, args, Fortnite) => {
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
    message.channel.send({ embed: embedAES });
  });
};