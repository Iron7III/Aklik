const Discord = require("discord.js");
const { createCanvas, loadImage, registerFont } = require('canvas')

exports.run = async (client, message, args, FortniteAPIComClient, FortniteAPIIoClient, {assets}) => {
	var GameModeType = args[0];
	var lang = args[1];
	if(!args[0] && !args[1]) {
		(lang = "en"), (GameModeType = "br");
	}
	if(!args[1]) {
		lang = "en";
	}
    FortniteAPIComClient.News(lang).then(res => {
    let baseEmbed = new Discord.MessageEmbed()
        .setDescription(`> **Hash ➜ **\`${res.data[GameModeType].hash}\``)
        .setImage(res.data[GameModeType].image)
        .setColor('#FD3D26')
    switch (GameModeType){
        case 'br':
            baseEmbed.setAuthor('Battle Royale News','https://i.imgur.com/QVMz5ln.png')
            break;
        case 'stw':
            baseEmbed.setAuthor('Save The World News','https://i.imgur.com/QVMz5ln.png')
            break;
        case 'creative':
            baseEmbed.setAuthor('Creative Mode News','https://i.imgur.com/QVMz5ln.png')
            break;
    }
    message.channel.send({embeds: [baseEmbed]})
    })
};