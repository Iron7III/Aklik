const {SlashCommandBuilder} = require('@discordjs/builders');
const Discord = require("discord.js");

module.exports = {
    name: 'ban',
    category: 'moderation',
    alias: [],
    data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban an user.')
    .addUserOption(option => option
        .setName('member')
        .setDescription('Set member\'s mention or id.')
        .setRequired(true))
    .addStringOption(option => option
        .setName('reason')
        .setDescription('Write a reason for the ban.')
        .setRequired(false)),
    async run(client, interaction){
        const member = interaction.guild.members.resolve(interaction.options.getUser('user').id);
        const reason = interaction.options.getString('reason')?interaction.options.getString('reason'):'No reason.';
    }
}