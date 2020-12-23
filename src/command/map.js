//  npm Discord
const Discord = require("discord.js");
//  Usuario del Bot de Discord
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true
});

exports.run = async (client, message, args, Fortnite) => {
    Fortnite.BRMap(args[0]).then(res => {
        console.log(res);
        const Map = new Discord.MessageEmbed()
            .setTitle(args[0]!=='blank'?`<:1F9ED_color:769624746739499009> Battle Royale Map [\`w/POIS\`]`:`<:1F9ED_color:769624746739499009> Battle Royale Map`)
            .setImage(args[0]!=='blank'?res.data.images.pois:res.data.images.blank)
            .setColor("#5cb85c");
        message.channel.send({ embed: Map})
    });
};