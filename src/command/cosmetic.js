const { default: axios } = require("axios");
const Discord = require("discord.js");
const fs = require("fs");
const { createCanvas, loadImage, registerFont } = require('canvas')

exports.run = async (client, message, args, FortniteAPIComClient, FortniteAPIIoClient, {assets}) => {
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

    async function newCosmetics(language){
        const data = await axios.get(`https://fortnite-api.com/v2/cosmetics/br/new?language=${language?language:'en'}`);
        const baseX = 512;
        const baseY = baseX;
        registerFont("BurbankBigRegularBlack.otf", {family: "Burbank Big Regular",style: "Black"});
        for(var i=0;i<data.data.data.items.length;i++){
            const beforeFinish = Date.now();
            const canvas = createCanvas(baseX, baseY);
            const ctx = canvas.getContext('2d', {alpha: false});
            //Image
            var img = await loadImage(data.data.data.items[i].images.icon);
            ctx.drawImage(img, 0, 0, baseX, baseY);
            fs.writeFileSync(`${data.data.data.items[i].id}.webp`, canvas.toBuffer());
        }
    }
    await newCosmetics();
};