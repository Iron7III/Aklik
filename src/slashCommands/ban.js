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
    async run(client, interaction, colors)
    {
        const member = interaction.guild.members.resolve(interaction.options.getUser('member').id);
        const reason = interaction.options.getString('reason')?interaction.options.getString('reason'):'No reason.';
        if(!member.bannable){
            embed.setDescription(`_The member can't be banned._`).setColor(colors.main)
            interaction.channel.send({embeds: [embed]})
                .then(msg => setTimeout(() => msg.delete(), 5000))
        }
    }
}