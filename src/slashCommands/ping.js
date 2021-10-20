const {SlashCommandBuilder} = require('@discordjs/builders');
const Discord = require("discord.js");

module.exports = {
    name: 'ping',
    category: 'information',
    alias: [],
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Returns BOT\'s ping.'),
    async run(client, interaction){
        const embed = new Discord.MessageEmbed()
        .setDescription(`**Ping: \`${Math.round(client.ws.ping)}\`ms**`)
        .setColor("#FD3D26");
        interaction.reply({embeds: [embed]})
    }
}