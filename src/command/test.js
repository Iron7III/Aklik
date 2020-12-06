const https = require('https');
const Discord = require("discord.js");
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true
});

const { createCanvas, loadImage, registerFont } = require('canvas')

exports.run = async (client, message, args, Fortnite) => {
    Fortnite.BRShop("en").then(res => {
        console.log(res)
        const canvas = createCanvas(512, 512)
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = 'rgba(255,255,255,1)';
        ctx.fillRect(0, 0, 512, 512)
        //items[0].
        loadImage(`https://cdn.glitch.com/e0a62737-efb4-4dbe-9768-8579bd913488%2Fcard_top_${res.data.featured.entries[0].items[0].rarity.value}.png?v=1603671088577`).then((image) => {
            ctx.drawImage(image, 0, 0, 512, 502)
            loadImage(res.data.featured.entries[0].items[0].images.icon).then((image) => {
                ctx.drawImage(image, 0, 0, 512, 512)
                loadImage(`https://cdn.glitch.com/e0a62737-efb4-4dbe-9768-8579bd913488%2Fcard_bottom_${res.data.featured.entries[0].items[0].rarity.value}.png?v=1603671079787`).then((image) => {
                    ctx.drawImage(image, 0, 81, 512, 431)
                    // COSMETIC NAME
                    ctx.fillStyle = 'white'
                    registerFont('Burbank Big Condensed Black 700.ttf', { family: 'Burbank Big Condensed Black' })
                    ctx.font = '30px Burbank Big Condensed'
                    var n = res.data.featured.entries[0].items[0].name;
                    var t = ctx.measureText(n);
                    ctx.fillText(n, (512-t.width)/2, 450)
                    // COSMETIC PRICE
                    ctx.fillStyle = 'white'
                    registerFont('Burbank Big Condensed Black 700.ttf', { family: 'Burbank Big Condensed Black' })
                    ctx.font = '36px Burbank Big Condensed'
                    var n = res.data.featured.entries[0].finalPrice;
                    var t = ctx.measureText(n);
                    ctx.fillText(n, (512-t.width)/2, 500)
                    const attach = new Discord.MessageAttachment(canvas.toBuffer(), 'cosmetic.png')
                    message.channel.send(attach)
/*
const embed = new Discord.RichEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL)
.attachFiles([attach]) o .attachFile(attach)
.setImage('attachment://nombre.png') <- El mismo nombre y formato.
message.channel.send(embed)
*/
                })
            })
        })
    })
}