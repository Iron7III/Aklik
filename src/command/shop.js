const Discord = require("discord.js");

exports.run = async (client, message, args, Fortnite) => {
    const test = new Discord.MessageEmbed()
      .setTitle('awdaw')
      .setColor('RANDOM')
    message.channel.send({files: ['shop-cataba.webp'],embed: test})
};
