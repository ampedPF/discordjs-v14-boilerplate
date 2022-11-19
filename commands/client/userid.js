const { SlashCommandBuilder, Client, CommandInteraction } = require("discord.js");


const slashCommandData = new SlashCommandBuilder()
    .setName('userid')
    .setDescription("Send user id")
    .addUserOption(option => option .setName("user")
                                    .setDescription("the targeted user"));

                                    
/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 */
const slashCommandFunction = async (client, interaction) => {
    const member = interaction.options.getMember("user");
    interaction.reply(`User ID of ${member.user.tag} is ${member.user.id}`);
}


module.exports = {
    data : slashCommandData,
    execute: slashCommandFunction,
}
