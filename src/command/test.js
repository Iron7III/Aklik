/*

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
  Fortnite.BRShop("es").then(res => {
    const icon = res.data.daily.entries[0].items[0].images.featured;
    //console.log(res.data.daily.entries[0]);
    
const { Canvas, resolveImage } = require('canvas-constructor');

    let image = new Canvas(300, 400)
        .setColor('#FFAE23')
        .setTextFont('28px Impact')
        .setTextAlign('center')
        .printText('Kitten!', 150, 370)
        .toBufferAsync();
  const{Attachment}= require('discord.js')
  const attachment = new Discord.MessageAttachment(image.toBuffer())
  message.channel.send(attachment)
}
  )};
  
  */