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
  var GameModeType = args[0];
  var lang = args[1];
  
  if (!args[0] && !args[1]) {
    (lang = "es"), (GameModeType = "br");
  }
  if (!args[1]) {
    lang = "es";
  }
  const log_ = `↳[NEWS PARAMETER]>[GAMEMODE]: ${GameModeType}\n↳[NEWS PARAMETER]>[LANGUAGE]: ${lang}`;
  console.warn(log_);
  if (GameModeType === "br" || !GameModeType) {
    Fortnite.NewsBR(lang).then(res => {
      const embedNewsBR = new Discord.MessageEmbed()
        .setTitle(`<:590234859486707752:590432801556267008> **Battle Royale News**`)
        .setImage(res.data.image)
        .setColor(0x262626);
      if (res.data.image == null) {
        embedNewsBR.setDescription(
          `No hay noticias del idioma o modo seleccionado.`
        );
      }
      message.channel.send({ embed: embedNewsBR });
    });
  } else if (GameModeType === "stw") {
    Fortnite.NewsSTW(lang).then(res => {
      const embedNewsSTW = new Discord.MessageEmbed()
        .setTitle(`**Save The World News**`)
        .setImage(res.data.image)
        .setColor(0x262626);
      console.log(res);
      if (res.data.image == null) {
        embedNewsSTW.setDescription(
          `No hay noticias del idioma o modo seleccionado.`
        );
      }
      message.channel.send({ embed: embedNewsSTW });
    });
  } else if (GameModeType === "creative") {
    Fortnite.NewsCreative(lang).then(res => {
      const embedNewsCreative = new Discord.MessageEmbed()
        .setTitle(`**Creative Mode News**`)
        .setImage(res.data.image)
        .setColor(0x262626);
      if (res.data.image == null) {
        embedNewsCreative.setDescription(
          `No hay noticias del idioma o modo seleccionado.`
        );
      }
/*
  var gamemodeType = args[0];
    if (!args[0] && !args[1]) {
    (lang = 'en'), (gamemodeType = 'br');
  }
  if (!args[1]) {
    lang = 'en';
  }
  var __title__ = '';
  if(gamemodeType === 'br') __title__='Battle Royale News';
      const news = new Discord.MessageEmbed()
        .setTitle(`**${__title__}**`)
        .setColor(0x262326)
      message.channel.send({ embed: news });
*/
      message.channel.send({ embed: embedNewsCreative });
    });
  }
};