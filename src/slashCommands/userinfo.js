const {SlashCommandBuilder} = require('@discordjs/builders');
const Discord = require("discord.js");

module.exports = {
    name: 'userinfo',
    category: 'utility',
    alias: [],
    data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Returns user Discord information.')
    .addUserOption(option => option
        .setName('user')
        .setDescription('Set user\'s mention or id.')
        .setRequired(false)),
    async run(client, interaction){
        console.log(interaction)
        var user, member;
        if(!interaction.options._hoistedOptions[0]){
            user=interaction.user;
            member=interaction.member;
        } else {
            user=interaction.options._hoistedOptions[0].user;
            member=interaction.options._hoistedOptions[0].member;
        }
        console.log(user)
        console.log(member)
    }
}