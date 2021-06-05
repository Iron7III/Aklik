const Discord = require("discord.js");
const client = new Discord.Client({
    disableEveryone: true,
    fetchAllMembers: true,
    ws: {
        properties: {
            $browser: "Discord Android"
        },
    },
    intents: Discord.Intents.NON_PRIVILEGED
});

exports.run = async (client, message, args, Fortnite) => {
    Fortnite.CosmeticsSearchByID(args[0], "en").then(res => {
        console.log(res);
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
        message.channel.send({ embed: embed });
    });
};