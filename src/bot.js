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



//  TEST
https.get('https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game', (resp) => {
  let data = '';
  // Un fragmento de datos ha sido recibido.
  resp.on('data', (chunk) => {
    data += chunk;
    console.log(chunk)
  });
  // Toda la respuesta ha sido recibida. Imprimir el resultado.
  resp.on('end', () => {
    console.log(JSON.parse(data).shopSections.sectionList.sections.map(t => t.sectionDisplayName).join(','));
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
})
//-------

//  TEST2
https.get('https://fortnite-public-service-stage.ol.epicgames.com/fortnite/api/version', (resp) => {
  let data = '';
  // Un fragmento de datos ha sido recibido.
  resp.on('data', (chunk) => {
    data += chunk;
  });
  // Toda la respuesta ha sido recibida. Imprimir el resultado.
  resp.on('end', () => {
    console.log(`${JSON.parse(data).cln}`);
    console.log(`${JSON.parse(data).build}`);
    console.log(`${JSON.parse(data).buildDate}`);
    console.log(`${JSON.parse(data).version}`);
    console.log(`${JSON.parse(data).branch}`);
    console.log(`${JSON.parse(data).moduleName}`);
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
})
//------

//EVENTO ready
client.on("ready", () => {
    const DevLogChannel=(client.guilds.cache.get('514150100575191040')).channels.cache.get('589422434134917134');
    console.log("[" + client.user.username + "]>[INFO]>[STARTED]>[TESTING]");
    DevLogChannel.send(`<@438390132538605589>\n\`\`\`ini\n[BOT] > [CONNECTED]\n\`\`\``);
    console.log(client);
    client.user.setActivity("NOW IN top.gg", { type: "WATCHING" });
});

//EVENTO message
client.on("message", async message => {
    let prefix = "f-";
    const args = message.content.slice(prefix.length).trim().split(" ");
    const DevLogChannel=(client.guilds.cache.get('514150100575191040')).channels.cache.get('589422434134917134');
    const cmd = args.shift().toLowerCase();
    const commandNotFound = new Discord.MessageEmbed()
        .setTitle(`**NO EXISTE EL COMANDO \`${cmd}\`**`)
        .setColor(0xf50000);
    if(cmd===undefined||!message.content.startsWith(`${prefix}${cmd}`||message.channel.type==='dm'||message.channel.nsfw)) return;
    var DevLogMessage;
    var s='+';
    try {
    let file = require(`./command/${cmd}.js`);
        file.run(client, message, args, Fortnite);
    } catch (e) {
        message.channel.send({ embed: commandNotFound }),
        console.log(e.stack),
        s='-';
    } finally {
        DevLogMessage=`\`\`\`md\n${s} [${message.guild.name}](${message.guild.id}) > [#${message.channel.name}](${message.channel.id}) > [@${message.author.tag}](${message.author.id}) > [${cmd.toUpperCase()}] ${args.map(a=>`<${a}>`).join(' ')}\n\`\`\``;
        DevLogChannel.send(DevLogMessage);
    }
});

// TOKEN
client.login('Njg1OTE5ODQ1MjMzMTk3MTAw.XmPrMg.zP9NwE20FvGVuG3Wj70Q5rPYJoQ').catch(e => console.log(e));