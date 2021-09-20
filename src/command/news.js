const { default: axios } = require("axios");
const Discord = require("discord.js");
const fs = require("fs");
const { createCanvas, loadImage, registerFont } = require('canvas')

exports.run = async (client, message, args, FortniteAPIComClient, FortniteAPIIoClient, {assets}) => {
    async function generateFullNews(gameMode,lang){
        var deafultLang = 'en';
        var deafultGameMode = 'br';
        var newsData = await axios.get(`https://fortnite-api.com/v2/news/${['br','creative'].includes(gameMode)?gameMode:deafultGameMode}?language=${['en','en','ru'].includes(lang)?lang:deafultLang}`);
        registerFont("BurbankBigRegularBlack.otf", {family: "Burbank Big Regular",style: "Black"});
        const baseWidth = 1920;
        const baseHeight = 1080;
        const canvas = createCanvas(baseWidth, baseHeight*newsData.data.data.motds.length);
        const ctx = canvas.getContext('2d');
        for(var i=0;i<newsData.data.data.motds.length;i++){
            var beforeFinish = Date.now();
            var image = await loadImage(newsData.data.data.motds[i].image);
            ctx.drawImage(image, 0, baseHeight*i, baseWidth, baseHeight);
            ctx.fillStyle = 'rgba(43,43,43,0.6)';
            var tabHeight = baseHeight/12;
            ctx.fillRect(0, baseHeight*i, baseWidth, tabHeight);
            var title = newsData.data.data.motds[i].title.toUpperCase();
            ctx.fillStyle = '#FFFFFF';
            ctx.strokeStyle = '#000000'
            ctx.lineWidth = 4;
            ctx.font = `${(tabHeight/2.5).toFixed()}px "Burbank Big Rg Bk"`;
            ctx.strokeText(title, (baseWidth-ctx.measureText(title).width)/2, baseHeight*i+(tabHeight+ctx.measureText(title).emHeightAscent)/2);
            ctx.fillText(title, (baseWidth-ctx.measureText(title).width)/2, baseHeight*i+(tabHeight+ctx.measureText(title).emHeightAscent)/2)
            console.log(`Rendered "${title}" | ${newsData.data.data.motds[i].id} in ${(Date.now()-beforeFinish)/1000}s`)
        }
        const attach = new Discord.MessageAttachment(canvas.toBuffer(), `${newsData.data.data.hash}.webp`)
        fs.writeFileSync(`${newsData.data.data.hash}.webp`, canvas.toBuffer());
        return attach;
    }
    async function generateSplitNews(gameMode,lang){
        var deafultLang = 'en';
        var deafultGameMode = 'br';
        const splitNews = []
        var newsData = await axios.get(`https://fortnite-api.com/v2/news/${['br','creative'].includes(gameMode)?gameMode:deafultGameMode}?language=${['en','en','ru'].includes(lang)?lang:deafultLang}`);
        registerFont("BurbankBigRegularBlack.otf", {family: "Burbank Big Regular",style: "Black"});
        const baseWidth = 1920;
        const baseHeight = 1080;
        for(var i=0;i<newsData.data.data.motds.length;i++){
            const canvas = createCanvas(baseWidth, baseHeight);
            const ctx = canvas.getContext('2d');
            var beforeFinish = Date.now();
            var img = await loadImage(newsData.data.data.motds[i].image);
            ctx.drawImage(img, 0, 0, baseWidth, baseHeight);
            ctx.fillStyle = 'rgba(43,43,43,0.6)';
            var tabHeight = baseHeight/12;
            ctx.fillRect(0, 0, baseWidth, tabHeight);
            var title = newsData.data.data.motds[i].title.toUpperCase();
            ctx.fillStyle = '#FFFFFF';
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 4;
            ctx.font = `${(tabHeight/2.5).toFixed()}px "Burbank Big Rg Bk"`;
            ctx.strokeText(title, (baseWidth-ctx.measureText(title).width)/2, (tabHeight+ctx.measureText(title).emHeightAscent)/2);
            ctx.fillText(title, (baseWidth-ctx.measureText(title).width)/2, (tabHeight+ctx.measureText(title).emHeightAscent)/2)
            console.log(`Rendered "${title}" | ${newsData.data.data.motds[i].id} in ${(Date.now()-beforeFinish)/1000}s`)
            const attach = new Discord.MessageAttachment(canvas.toBuffer(), `${newsData.data.data.motds[i].id}.webp`)
            fs.writeFileSync(`${newsData.data.data.motds[i].id}.webp`, canvas.toBuffer());
            splitNews.push(attach)
        }
        return splitNews;
    }
    //var brimgs = await generateSplitNews(args[0],args[1])
    //var embeds = []
    //brimgs.map(img => {
    //    var embed = new Discord.MessageEmbed()
    //        .setImage(img.name)
    //    embeds.push(embed)
    //})
    //message.channel.send({embeds: embeds})
    var brimg = await generateFullNews(args[0],args[1])
    message.channel.send({files:[brimg]})
};