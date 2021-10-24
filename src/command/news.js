const { default: axios } = require("axios");
const Discord = require("discord.js");
const fs = require("fs");
const { createCanvas, loadImage, registerFont } = require('canvas')

exports.run = async (client, message, args, FortniteAPIComClient, FortniteAPIIoClient, {assets}) => {
    /**
    * @param {string} gameMode
    * @param {string} lang
    */
    async function generateFullNews(gameMode,lang){
        var deafultLang = 'en';
        var deafultGameMode = 'br';
        var newsData = await axios.get(`https://fortnite-api.com/v2/news/${['br','creative'].includes(gameMode)?gameMode:deafultGameMode}?language=${['en','en','ru'].includes(lang)?lang:deafultLang}`);
        registerFont("BurbankBigRegularBlack.otf", {family: "Burbank Big Regular",style: "Black"});
        const baseWidth = 1920;
        const baseHeight = baseWidth/(16/9);
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
    /**
    * @param {string} language
    * @param {number} resolution
    */
    async function newsBR(language,resolution){
        const data = await axios.get(`https://fortnite-api.com/v2/news/br?language=${language}`);
        const news=[];
        const baseX = 1920; // Width
        const baseY = baseX/(16/9); // Height
    // Font
        registerFont("BurbankBigRegularBlack.otf", {family: "Burbank Big Regular",style: "Black"});
    // Tab Height
        const tabY = (8.4/100)*baseY;
    // Body x & y
        const bodyX = (tabY/2).toFixed(1);
        const bodyY = (90/100)*baseY;
    // Font Sizes
        const tabTitleFontSize = (tabY/2.8).toFixed();
        const bodyFontSize = (tabY/2.6).toFixed();
        const titleFontSize = (tabY/1.2).toFixed();
    // Template
        const template = await loadImage('template.png');
    // Images Generation
        for(var i=0;i<data.data.data.motds.length;i++){
            const beforeFinish = Date.now(); // Beggining
            const canvas = createCanvas(baseX, baseY);
            const ctx = canvas.getContext('2d', {alpha: false});
            async function divideString(str,maxLenght,fontSize,style){
                var splitedString = str.split(/ +/g);
                var lines = 0;
                var finalText = '';
                ctx.font = `${style?`${style} `:''}${fontSize}px "Burbank Big Rg Bk"`;
                for(var i=0;i<splitedString.length;i++){
                    var tryText = `${finalText.length>0?`${finalText} ${splitedString[i]}`:`${splitedString[i]}`}`;
                    if(ctx.measureText(tryText).width<maxLenght){
                        finalText = tryText;
                    }else{
                        lines++;
                        finalText = `${finalText}\n${splitedString[i]}`;
                    }
                }
                return {text: finalText, linesCount: lines};
            }
        //Image
            var img = await loadImage(data.data.data.motds[i].image);
            ctx.drawImage(img, 0, 0, baseX, baseY);
        // Template
            ctx.drawImage(template, 0, 0, baseX, baseY);
        //Tab Title
            var tabTitle = data.data.data.motds[i].tabTitle!==null?data.data.data.motds[i].tabTitle.toUpperCase():data.data.data.motds[i].title.toUpperCase();
            ctx.fillStyle = '#FFFFFF';
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 4;
            ctx.font = `${tabTitleFontSize}px "Burbank Big Rg Bk"`;
            ctx.strokeText(tabTitle, (baseX-ctx.measureText(tabTitle).width)/2, (tabY+ctx.measureText(tabTitle).emHeightAscent)/2);
            ctx.fillText(tabTitle, (baseX-ctx.measureText(tabTitle).width)/2, (tabY+ctx.measureText(tabTitle).emHeightAscent)/2);
        //Body
            var bodyLines = await divideString(data.data.data.motds[i].body,baseX/2-tabY/2,bodyFontSize);
            ctx.fillStyle = '#55D6F8';
            ctx.font = `${bodyFontSize}px "Burbank Big Rg Bk"`;
            ctx.fillText(bodyLines.text, bodyX, (bodyY-((tabY/2)*bodyLines.linesCount)).toFixed(1))
        //Title
            var titleLines = await divideString(data.data.data.motds[i].title,baseX/2-tabY/2,titleFontSize,'italic');
            ctx.fillStyle = '#FFFFFF';
            ctx.font = `italic ${titleFontSize}px "Burbank Big Rg Bk"`;
            ctx.fillText(titleLines.text.toUpperCase(), bodyX, bodyY-((tabY/2)*(bodyLines.linesCount+1))-((tabY)*titleLines.linesCount));
        //Other
            console.log(`Rendered "${data.data.data.motds[i].title.toUpperCase()}" | ${data.data.data.motds[i].id} in ${(Date.now()-beforeFinish)/1000}s`)
            const attach = new Discord.MessageAttachment(canvas.toBuffer(), `${data.data.data.motds[i].id}.webp`)
            fs.writeFileSync(`${data.data.data.motds[i].id}.webp`, canvas.toBuffer());
            news.push({image: attach, title: data.data.data.motds[i].title, videoId: data.data.data.motds[i].videoId?`https://cdn.fortnite-api.com/streams/${data.data.data.motds[i].videoId}/${language}.mp4`:null})
        }
        return news;
    }
        async function generateSTW(data){
            const newsArray =  []
            const baseWidth = 1920;
            const baseHeight = baseWidth/2;
            registerFont("BurbankBigRegularBlack.otf", {family: "Burbank Big Regular",style: "Black"});
            for(var i=0;i<data.data.data.messages.length;i++){
            //Global constants.
                const canvas = createCanvas(baseWidth, baseHeight);
                const ctx = canvas.getContext('2d');
                var beforeFinish = Date.now();
            //Function code.
                //Image
                var img = await loadImage(data.data.data.messages[i].image);
                ctx.drawImage(img, 0, 0, baseWidth, baseHeight);
                // Body
                var body = data.data.data.messages[i].body;
                var bodyFontSize = ((8.4/100)*baseHeight/2.6).toFixed();
                async function splitStringIntoLines(str,maxLenght){
                    var splitedString = str.split(/ +/g);
                    var lines = [];
                    var finalText = `${splitedString[0]}`;
                    for(var i=1;i<splitedString.length;i++){
                        var tryText = `${finalText} ${splitedString[i]}`;
                        ctx.measureText(tryText).width<maxLenght?finalText=tryText:lines.unshift(`${finalText}`),finalText=`${splitedString[i]}`;
                    }
                    lines.unshift(`${finalText}`);
                    return lines;
                }
                var lines = await splitStringIntoLines(body,baseWidth/2-tabHeight/2);
                console.log(lines)
                ctx.fillStyle = '#368CC5';
                ctx.font = `${bodyFontSize}px "Burbank Big Rg Bk"`;
                async function drawBody(lines){
                    for(var i=0;i<lines.length;i++){
                        ctx.fillText(lines[i], (8.4/100)*baseHeight/2, (90/100)*baseHeight-((8.4/100)*baseHeight/2)*i)
                    }
                }
                await drawBody(lines)
                //Title
                var titleFontSize = ((8.4/100)*baseHeight/1.1).toFixed();
                ctx.fillStyle = '#101427';
                ctx.font = `italic ${titleFontSize}px "Burbank Big Rg Bk"`;
                ctx.fillText(data.data.data.messages[i].title.toUpperCase(), (8.4/100)*baseHeight/2, (90/100)*baseHeight-((8.4/100)*baseHeight/2)*lines.length)
                //Watermark
                ctx.globalAlpha = 0.5;
                var watermark = await loadImage('watermark.png');
                ctx.drawImage(watermark, baseWidth-(14/100)*baseWidth, baseHeight-(13/100)*baseWidth, (10/100)*baseWidth, (10/100)*baseWidth);
                //Other
                console.log(`Rendered "${data.data.data.messages[i].title.toUpperCase()}" | ${data.data.data.messages[i].id} in ${(Date.now()-beforeFinish)/1000}s`)
                const attach = new Discord.MessageAttachment(canvas.toBuffer(), `${data.data.data.messages[i].id}.webp`)
                fs.writeFileSync(`${data.data.data.messages[i].image.slice('https://cdn2.unrealengine.com/'.length,-4)}.webp`, canvas.toBuffer());
                newsArray.push({image: attach, title: data.data.data.messages[i].title})
            }
            return newsArray;
        }
    var news = await newsBR(args[0]?args[0]:'en');
    const embed = new Discord.MessageEmbed()
        
    news.map(n => {
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