//VARIABLES GENERALES
const Discord = require("discord.js");
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true
});
const { MessageEmbed } = require("discord.js");
const FortniteAPI = require("fortnite-api-com");
const config = {
  apikey: "f932b4642b7f68bee1f619a073524a174b03e942498cbaa0626e245b11905e1b",
  language: "es"
};
var Fortnite = new FortniteAPI(config);

//EVENTO ready
client.on("ready", () => {
  console.log("[" + client.user.username + "]>[INFO]>[STARTED]>[TESTING]");
  (client.guilds.cache.get('514150100575191040')).channels.cache.get('589422434134917134').send(`[BOT] **>** [${client.user.username}] **>** [CONNECTED]`);
  //console.log(client);
  client.user.setActivity("IMPROVING", { type: "WATCHING" });
});

//EVENTO message
client.on("message", async message => {
  let prefix = "f*";
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(" ");
  const cmd = args.shift().toLowerCase();
  const commandNotFound = new Discord.MessageEmbed()
    .setTitle(`**NO EXISTE EL COMANDO \`${cmd}\`**`)
    .setColor(0xf50000);
  if (cmd === "") return;
  if (!message.content.startsWith(`${prefix}${cmd}`)) return;
  if (message.channel.type === "dm") return;
  if (message.channel.nsfw) return;
  var commandStatus;
  try {
    let archivo = require(`./command/${cmd}.js`);
    archivo.run(client, message, args, Fortnite);
    commandStatus=true
  } catch (e) {
    message.channel.send({ embed: commandNotFound }),
    console.log(e.stack),
    commandStatus=false
  } finally {
    if(commandStatus==true){console.log(`[${message.guild.name}]➧[#${message.channel.name}]➧[@${message.author.tag}]➧[\x1b[32m${cmd}\x1b[0m]`)}
    else if(commandStatus==false){console.log(`[${message.guild.name}]➧[#${message.channel.name}]➧[@${message.author.tag}]➧[\x1b[31m${cmd}\x1b[0m]`)}
    (client.guilds.cache.get('514150100575191040')).channels.cache.get('589422434134917134').send(`[BOT] **>** [${client.user.username}] **>** [COMMAND] **>** [${message.guild.name}] **>** [#${message.channel.name}] **>** [@${message.author.tag}] **>** [${cmd.toUpperCase()}]`);
  }
});

// TOKEN
client.login('Njg1OTE5ODQ1MjMzMTk3MTAw.XmPrMg.zP9NwE20FvGVuG3Wj70Q5rPYJoQ').catch(e => console.log(e));
