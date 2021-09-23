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
        const splitNews =  []
        var newsData = await axios.get(`https://fortnite-api.com/v2/news/${['br','creative'].includes(gameMode)?gameMode:deafultGameMode}?language=${['en','es','it'].includes(lang)?lang:deafultLang}`);
        registerFont("BurbankBigRegularBlack.otf", {family: "Burbank Big Regular",style: "Black"});
        const baseWidth = 1920;
        const baseHeight = 1080;
        for(var i=0;i<newsData.data.data.motds.length;i++){
        //Global constants.
            const canvas = createCanvas(baseWidth, baseHeight);
            const ctx = canvas.getContext('2d');
            var beforeFinish = Date.now();
        //Function code.
            //Image
            var img = await loadImage(newsData.data.data.motds[i].image);
            ctx.drawImage(img, 0, 0, baseWidth, baseHeight);
            //Tab Rectangle
            var tabHeight = (8.4/100)*baseHeight;
            ctx.fillStyle = 'rgba(100,100,100,0.6)';
            ctx.fillRect(0, 0, baseWidth, tabHeight);
            //Tab Title
            var tabTitle = newsData.data.data.motds[i].tabTitle!==null?newsData.data.data.motds[i].tabTitle.toUpperCase():newsData.data.data.motds[i].title;
            var tabTitleFontSize = (tabHeight/2.8).toFixed();
            ctx.fillStyle = '#FFFFFF';
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 4;
            ctx.font = `${tabTitleFontSize}px "Burbank Big Rg Bk"`;
            ctx.strokeText(tabTitle, (baseWidth-ctx.measureText(title).width)/2, (tabHeight+ctx.measureText(title).emHeightAscent)/2);
            ctx.fillText(tabTitle, (baseWidth-ctx.measureText(title).width)/2, (tabHeight+ctx.measureText(title).emHeightAscent)/2)
            //Bottom Gradient
            var gradient = ctx.createLinearGradient(baseWidth/2, 0, baseWidth/2, baseHeight);
            gradient.addColorStop(0.4, 'rgba(0,0,0,0)');
            gradient.addColorStop(1, 'rgba(0,60,255,0.3)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, baseWidth, baseHeight)
            // Body
            var body = newsData.data.data.motds[i].body;
            var bodyFontSize = (tabHeight/2.6).toFixed();
            async function splitStringIntoLines(str){
                var x = str;
                var lines = [];
                while(x.length!==0){
                    var y = x.replace(/^(.{50}[^\s]*).*/, "$1");
                    var x = x.replace(y,'').slice(1,x.length)
                    lines.push(y)
                }
                return lines.reverse()
            }
            var lines = await splitStringIntoLines(body);
            ctx.fillStyle = '#55D6F8';
            ctx.font = `${bodyFontSize}px "Burbank Big Rg Bk"`;
            async function drawBody(lines){
                for(var i=0;i<lines.length;i++){
                    ctx.fillText(lines[i], tabHeight/2, (90/100)*baseHeight-(tabHeight/2)*i)
                }
            }
            await drawBody(lines)
            //Title
            var title = newsData.data.data.motds[i].title.toUpperCase();
            var titleFontSize = (tabHeight/1.1).toFixed();
            ctx.fillStyle = '#FFFFFF';
            ctx.font = `italic ${titleFontSize}px "Burbank Big Rg Bk"`;
            ctx.fillText(title, tabHeight/2, (90/100)*baseHeight-(tabHeight/2)*lines.length)
            //Watermark
            ctx.globalAlpha = 0.5;
            var watermark = await loadImage('watermark.png');
            ctx.drawImage(watermark, baseWidth-(14/100)*baseWidth, baseHeight-(13/100)*baseWidth, (10/100)*baseWidth, (10/100)*baseWidth);
            //Other
            console.log(`Rendered "${title}" | ${newsData.data.data.motds[i].id} in ${(Date.now()-beforeFinish)/1000}s`)
            const attach = new Discord.MessageAttachment(canvas.toBuffer(), `${newsData.data.data.motds[i].id}.webp`)
            fs.writeFileSync(`${newsData.data.data.motds[i].id}.webp`, canvas.toBuffer());
            //Video Link
            if(newsData.data.data.motds[i].videoId){
                videoId=`https://cdn.fortnite-api.com/streams/${newsData.data.data.motds[i].videoId}/${deafultLang}.mp4`
            }
            splitNews.push({image: attach, title: newsData.data.data.motds[i].title, videoId: newsData.data.data.motds[i].videoId?`https://cdn.fortnite-api.com/streams/${newsData.data.data.motds[i].videoId}/${deafultLang}.mp4`:null})
        }
        return splitNews
    }
    await generateFullNews(args[0],args[1])
    var splitNews = await generateSplitNews(args[0],args[1])
    console.log(splitNews)
    splitNews.map(n => {
        const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
                .setLabel(n.title)
                .setStyle('LINK')
                .setEmoji(client.emojis.cache.get("890738286111371295"))
                .setURL(n.videoId?n.videoId:'')
        )
        message.channel.send({files: [n.image],components: n.videoId?[row]:null})
    })
};