const { default: axios } = require("axios");
const Discord = require("discord.js");
const fs = require("fs");
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
    FortniteAPIComClient.News(lang).then(async res => {
        async function BATTLE_ROYALE_NEWS(lang){
            var deafultLang = 'en';
            var newsData = await axios.get(`https://fortnite-api.com/v2/news/br?language=${['en','en','ru'].includes(lang)?lang:deafultLang}`);
            registerFont("BurbankBigRegularBlack.otf", {family: "Burbank Big Regular",style: "Black"});
            console.log(newsData)
            const canvas = createCanvas(1280, 720*newsData.data.data.motds.length);
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = 'white'
            for(var i=0;i<newsData.data.data.motds.length;i++){
                var image = await loadImage(newsData.data.data.motds[i].image);
                ctx.drawImage(image, 0, 720*i, 1280, 720);
                var title = newsData.data.data.motds[i].title;
                ctx.font = '50px "Burbank Big Rg Bk"';
                ctx.fillText(title, (1280-ctx.measureText(title).width)/2, 720*i+60)
                console.log(`Rendered ${title}`)
            }
            const attach = new Discord.MessageAttachment(canvas.toBuffer(), `${newsData.data.data.hash}.webp`)
            fs.writeFileSync(`${newsData.data.data.hash}.webp`, canvas.toBuffer());
            return attach;
        }
        var brimg = await BATTLE_ROYALE_NEWS(args[0])
            message.channel.send({files:[brimg]})
        console.log(brimg)
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