const {SlashCommandBuilder} = require('@discordjs/builders');
const Discord = require("discord.js");

module.exports = {
    name: 'ping',
    category: 'information',
    alias: [],
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Returns BOT\'s ping.'),
    async run(client, interaction, colors){
        const embed = new Discord.MessageEmbed()
        .setDescription(`**Ping: \`${Math.round(client.ws.ping)}\`ms**`)
        .setColor(colors.main);
        interaction.reply({embeds: [embed]})
    }
}