const Discord = require("discord.js");
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true
});
const { createCanvas, loadImage, registerFont } = require('canvas')

exports.run = async (client, message, args, Fortnite) => {
    Fortnite.BRShop("es").then(async res => {
        console.log(res.data)
        console.log(res.data.daily.entries)
        const canvas = createCanvas(512, 512)
        const ctx = canvas.getContext('2d')
            ctx.fillRect(0, 0, 512, 512)
            finalimage=res.data.daily.entries.map(loadImage(images.icon).then((image) => {ctx.drawImage(image, 0, 0, 512*finalimage.pos, 512)}))
            loadImage().then((image) => {
                ctx.drawImage(image, 0, 0, 512, 512)
                    const attach = new Discord.MessageAttachment(canvas.toBuffer(), `${res.data.id}.jpg`)
                message.channel.send(attach)
            })
    })
}