const Discord = require("discord.js");

exports.run = async (client, message, args, FortniteAPIComClient, FortniteAPIIoClient, {assets}) => {
    Fortnite.CosmeticsSearchByID(args[0], "en").then(res => {
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
        const embed = new Discord.MessageEmbed()
            .setTitle(`**${res.data.name.toUpperCase()}**`)
            .addField(
                `**ID**`,
                `\`\`\`${res.data.id}\`\`\``,
                false
            )
            .addField(
                `**DESCRIPCIÓN**`,
                `\`\`\`${res.data.description}\`\`\``,
                false
            )
            .addField(
                `**TIPO**`,
                `\`\`\`${res.data.type.displayValue}\`\`\``,
                true
            )
            .addField(
                `**RAREZA**`,
                `\`\`\`${res.data.rarity.displayValue.toUpperCase()}\`\`\``,
                false
            )
            .addField(
                `**INTRODUCIDO**`,
                `\`\`\`CAPITULO ${res.data.introduction.chapter} | TEMPORADA ${res.data.introduction.season}\`\`\``,
                false
            )
            .addField(
                `**PATH**`,
                `\`\`\`${res.data.path}\`\`\``,
                false
            );
        if (res.data.set != null) {
            embed.addField(
                `**CONJUNTO**`,
                `\`\`\`${res.data.set.text}\`\`\``,
                false
            )
        } else if (res.data.set == null) {
            embed.addField(
                `**CONJUNTO**`,
                `\`\`\`No tiene\`\`\``,
                false
            )
        }
        if (res.data.images.featured != null) {
            embed.setImage(res.data.images.featured);
        } else if (res.data.images.featured == null) {
            embed.setImage(res.data.images.icon);
        } 
        if(res.data.shopHistory != null) {
            embed.addField(
                `**HISTORIAL DE TIENDA**`,
                `${res.data.shopHistory.join(`\n`)}`,
                false
            )
        }
        message.channel.send({ embeds: [embed] });
    });
};