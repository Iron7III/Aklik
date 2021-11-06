const {SlashCommandBuilder} = require('@discordjs/builders');
const Discord = require("discord.js");

module.exports = {
    name: 'avatar',
    category: 'utility',
    alias: [],
    data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Returns user Discord avatar.')
    .addUserOption(option => option
        .setName('user')
        .setDescription('Set user\'s mention or id.')
        .setRequired(false)),
    async run(client, interaction, colors){
        var user;
        if(!interaction.options.getUser('user')){
            user=await interaction.user.fetch(true);
        } else {
            user=await interaction.options.getUser('user').fetch(true);
        }
        console.log(user)
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${user.username}'s Avatar`,user.avatar!==null?`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.startsWith('a_')?'gif':'png'}?size=512`:user.defaultAvatarURL)
        .setColor(colors.main)
        .setImage(user.avatar!==null?`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.startsWith('a_')?'gif':'png'}?size=1024`:user.defaultAvatarURL);
        interaction.reply({embeds: [embed]});
    }
}