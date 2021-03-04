//  npm Discord
const Discord = require("discord.js");
//  Usuario del Bot de Discord
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true
});

exports.run = async (client, message, args, Fortnite) => {
    message.delete()
    var p = [
        `𝗩𝗜𝗖𝗧𝗢𝗥𝗜𝗔 𝗠𝗔𝗚𝗜𝗦𝗧𝗥𝗔𝗟 ➜ ${client.emojis.cache.get("817073966106542091")}`,
        `𝗧𝗢𝗣 𝟱 ➜ ${client.emojis.cache.get("817073966170636308")}`,
        `𝗧𝗢𝗣 𝟭𝟱 ➜ ${client.emojis.cache.get("817073966170636308")}`,
        `𝗧𝗢𝗣 𝟮𝟱 ➜ ${client.emojis.cache.get("817073966170636308")}`,
        `𝗧𝗢𝗣 𝟱𝟬 ➜ ${client.emojis.cache.get("817073965842432011")}`,
        `𝗘𝗟𝗜𝗠𝗜𝗡𝗔𝗖𝗜𝗢𝗡 ➜ ${client.emojis.cache.get("817073965842432011")}`
    ]
    const PlacementSolo = new Discord.MessageEmbed()
        .setTitle(`**𝗣𝗨𝗡𝗧𝗨𝗔𝗖𝗜𝗢𝗡 𝗠𝗢𝗗𝗢 𝗦𝗢𝗟𝗜𝗧𝗔𝗥𝗜𝗢**`)
        .setDescription(p.join('\n'))
    message.channel.send({embed:PlacementSolo})
};