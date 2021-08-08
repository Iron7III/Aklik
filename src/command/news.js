const Discord = require("discord.js");
const { createCanvas, loadImage, registerFont } = require('canvas')

exports.run = async (client, message, args, FortniteAPIComClient, FortniteAPIIoClient, {assets}) => {
  var GameModeType = args[0];
  var lang = args[1];
  
  if (!args[0] && !args[1]) {
    (lang = "es"), (GameModeType = "br");
  }
  if (!args[1]) {
    lang = "es";
  }
  if (GameModeType === "br" || !GameModeType) {
    Fortnite.NewsBR(lang).then(res => {
      const embedNewsBR = new Discord.MessageEmbed()
        .setTitle(`<:590234859486707752:590432801556267008> **Battle Royale News**`)
        .setImage(res.data.image)
        .setColor('#ff5e00');
      if (res.data.image == null) {
        embedNewsBR.setDescription(
          `No hay noticias del idioma o modo seleccionado.`
        );
      }
      message.channel.send({ embeds: [embedNewsBR] });
    });
  } else if (GameModeType === "stw") {
    Fortnite.NewsSTW(lang).then(res => {
      const embedNewsSTW = new Discord.MessageEmbed()
        .setTitle(`**Save The World News**`)
        .setImage(res.data.image)
        .setColor('#ff5e00');
      console.log(res);
      if (res.data.image == null) {
        embedNewsSTW.setDescription(
          `No hay noticias del idioma o modo seleccionado.`
        );
      }
      message.channel.send({ embeds: [embedNewsSTW] });
    });
  } else if (GameModeType === "creative") {
    Fortnite.NewsCreative(lang).then(res => {
      const embedNewsCreative = new Discord.MessageEmbed()
        .setTitle(`**Creative Mode News**`)
        .setImage(res.data.image)
        .setColor('#ff5e00');
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
      message.channel.send({ embeds: [embedNewsCreative] });
    });
  }

Fortnite.News('es').then(res => {
const canvas = createCanvas(1920*res.data.br.motds.length,1080)
const ctx = canvas.getContext('2d')
ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, 1920*res.data.br.motds.length,1080)
loadImage(res.data.br.motds[0].image).then((image) => {
    ctx.drawImage(image, 0, 0)
loadImage(res.data.br.motds[1].image).then((image) => {
    ctx.drawImage(image, 1920, 0)
loadImage(res.data.br.motds[2].image).then((image) => {
    ctx.drawImage(image, 3840, 0)
const attach = new Discord.MessageAttachment(canvas.toBuffer(), `news.jpg`)
message.channel.send(attach)
})})})});
Fortnite.News('es').then(res => {
const canvas = createCanvas(1920*res.data.br.motds.length,1080)
const ctx = canvas.getContext('2d')
ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, 1920*res.data.br.motds.length,1080)
loadImage(res.data.br.motds[0].image).then((image) => {
    ctx.drawImage(image, 0, 0)
loadImage(res.data.br.motds[1].image).then((image) => {
    ctx.drawImage(image, 1920, 0)
loadImage(res.data.br.motds[2].image).then((image) => {
    ctx.drawImage(image, 3840, 0)
loadImage(res.data.br.motds[3].image).then((image) => {
    ctx.drawImage(image, 5760, 0)
const attach = new Discord.MessageAttachment(canvas.toBuffer(), `news.jpg`)
message.channel.send(attach)
})})})})});
};