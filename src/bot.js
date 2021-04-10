//VARIABLES GENERALES
const Discord = require("discord.js");
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true
});
const express = require("express");
const https = require('https');
const { MessageEmbed } = require("discord.js");
const FortniteAPI = require("fortnite-api-com");
const config = {
    apikey: "f932b4642b7f68bee1f619a073524a174b03e942498cbaa0626e245b11905e1b",
    language: "en"
};
var Fortnite = new FortniteAPI(config);


//EVENTO ready
client.on("ready", () => {
    const DevLogChannel=(client.guilds.cache.get('514150100575191040')).channels.cache.get('589422434134917134');
    console.log("[" + client.user.username + "]>[INFO]>[STARTED]>[TESTING]");
    const ready = new Discord.MessageEmbed()
        .setTitle(`CONECTADO`)
        .setColor('RANDOM')
    DevLogChannel.send({ embed: ready })
    client.user.setActivity("Invitame :D", { type: "WATCHING" });
});

//EVENTO message
client.on("message", async message => {
    let prefix = "f-";
    const args = message.content.slice(prefix.length).trim().split(" ");
    const DevLogChannel=client.channels.cache.get('589422434134917134');
    const cmd = args.shift().toLowerCase();
    if(cmd===undefined||!message.content.startsWith(`${prefix}${cmd}`||message.channel.dm)) return;
    var DevLogMessage;
    var s='+';
    try {
    let file = require(`./command/${cmd}.js`);
        file.run(client, message, args, Fortnite);
    } catch (e) {
        console.log(e.stack),
        s='-';
    } finally {
        DevLogMessage=`\`\`\`md\n[${message.guild.name}](${message.guild.id})\n[#${message.channel.name}](${message.channel.id})\n[@${message.author.tag}](${message.author.id})\n[${cmd.toUpperCase()}] ${s}\n${args.map(a=>`<${a}>`).join(' ')}\n\`\`\``;
        DevLogChannel.send(DevLogMessage);
    }
});

client.on("guildCreate", (guild) => {
    client.channels.cache.get("Id del canal").send(`NUEVO SERVIDOR: ${guild.name}`)
})




// TOKEN
client.login('Njg1OTE5ODQ1MjMzMTk3MTAw.XmPqog.aWA9QK8J5GLEe3Bgr4EMAgEfxBg').catch(e => console.log(e));