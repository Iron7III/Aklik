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
  Fortnite.BRMap(args[0]).then(res => {
    console.log(res);
    const MapPoisEmbed = new Discord.MessageEmbed()
      .setTitle(`<:1F9ED_color:769624746739499009> Battle Royale Map [\`w/POIS\`]`)
      .setImage(res.data.images.pois)
      .setColor("#5cb85c");
    const MapBlankEmbed = new Discord.MessageEmbed()
      .setTitle(`<:1F9ED_color:769624746739499009> Battle Royale Map`)
      .setImage(res.data.images.blank)
      .setColor("#5cb85c");
    if (args[0] != "blank") {
      message.channel.send({ embed: MapPoisEmbed });
    } else if (args[0] == "blank") {
      message.channel.send({ embed: MapBlankEmbed });
    }
  });
};
