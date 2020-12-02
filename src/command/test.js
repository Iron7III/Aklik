const https = require('https');
const Discord = require("discord.js");
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true
});
const { createCanvas, loadImage, registerFont } = require('canvas')

exports.run = async (client, message, args, Fortnite) => {
    Fortnite.CosmeticsSearchByID(args[0], "es").then(res => {
        console.log(res)
        const canvas = createCanvas(512, 512)
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = 'rgba(255,255,255,1)';
        ctx.fillRect(0, 0, 512, 512)
        loadImage(`https://cdn.glitch.com/e0a62737-efb4-4dbe-9768-8579bd913488%2Fcard_top_${res.data.rarity.value}.png?v=1603671088577`).then((image) => {
            ctx.drawImage(image, 0, 0, 512, 502)
            loadImage(res.data.images.icon).then((image) => {
                ctx.drawImage(image, 0, 0, 512, 512)
                loadImage(`https://cdn.glitch.com/e0a62737-efb4-4dbe-9768-8579bd913488%2Fcard_bottom_${res.data.rarity.value}.png?v=1603671079787`).then((image) => {
                    ctx.drawImage(image, 0, 81, 512, 431)
                    ctx.fillStyle = 'white'
                    registerFont('fortnite-bot/burbank-big-condensed-black.otf', { family: 'Burbank Big Condensed Black' })
                    ctx.font = '40px Burbank Big Condensed'
                    var n = res.data.name;
                    var t = ctx.measureText(n)
                    ctx.fillText(n, (512-t.width)/2, 280)
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