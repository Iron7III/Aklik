const Discord = require("discord.js");
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true
});

exports.run = async (client, message, args, Fortnite) => {
    Fortnite.PlaylistsID(args[0],"es").then(res => {
        console.log(res)
})}