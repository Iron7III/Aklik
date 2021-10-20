const fs = require("fs");
const Discord = require("discord.js");
const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');
require('dotenv').config()
const commands = [];
const slashCommandsFiles = fs.readdirSync('src/slashCommands').filter(file => file.endsWith('js'));

for(const file of slashCommandsFiles){
    const slashCommand = require(`./slashCommands/${file}`);
    commands.push(slashCommand.data.toJSON());
}
const rest = new REST({version: '9'}).setToken(process.env.TOKEN);
createSlashCommand();
async function createSlashCommand(){
    try{
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID,process.env.SLASH_COMMANDS_TESTING_GUILD_ID), {body: commands});
        console.log('Slash Commands addeds.');
    } catch (e) {
        console.error(e);
    }
}