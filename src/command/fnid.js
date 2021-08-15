const Discord = require("discord.js");

exports.run = async (client, message, args, FortniteAPIComClient, FortniteAPIIoClient, {assets}) => {
    FortniteAPIComClient.CosmeticsSearchByID(args[0], "en").then(res => {
        console.log(res);
        if(!args){
            const ErrorEmbed = new Discord.MessageEmbed()
                .setAuthor(`Write a cosmetic ID.`,client.emojis.cache.get('861325114694696960').url)
                .setColor('#ED4245')
            message.channel.send({embeds: [ErrorEmbed]})
                .then(msg => client.setTimeout(() => msg.delete(), 5000))
        }
        if(res==undefined){
            const ErrorEmbed2 = new Discord.MessageEmbed()
                .setAuthor(`Write a valid cosmetic ID.`,client.emojis.cache.get('861325114694696960').url)
                .setColor('#ED4245')
            message.channel.send({embeds: [ErrorEmbed2]})
                .then(msg => client.setTimeout(() => msg.delete(), 5000))
        }
        let data = [
            `> **Id ➜ **\`${res.data.id}\``,
            `> **Type ➜ **\`${res.data.type.displayValue}\``,
            `> **Rarity ➜ **\`${res.data.rarity.displayValue}\``,
            `> **Introduced ➜ **\`c${res.data.introduction.chapter} | s${res.data.introduction.season}\``,
            `> **Bundle ➜ **\`${res.data.set?res.data.set.value:'Any'}\``,
            `> **Path ➜ **\`${res.data.path}\``
        ]
        const embed = new Discord.MessageEmbed()
            .setAuthor(`${res.data.name}`,res.data.images.smallIcon)
            .setDescription(res.data.description)
            .addField('Information',data.join('\n'))
            .setColor('#FD3D26')
        if (res.data.images.featured != null) {
            embed.setImage(res.data.images.featured);
        } else if (res.data.images.featured == null) {
            embed.setImage(res.data.images.icon);
        } 
        if(res.data.shopHistory != null) {
            data.push(`> **Shop History ➜ **\n\`${res.data.shopHistory.join(`\`\n\``)}\``)
        }
        message.channel.send({ embeds: [embed] });
    });
};