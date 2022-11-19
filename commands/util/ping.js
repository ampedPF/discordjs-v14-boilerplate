const { SlashCommandBuilder, EmbedBuilder, CommandInteraction, Client } = require('discord.js');


const slashCommandData = new SlashCommandBuilder()
    .setName('ping')
    .setDescription("Replies Pong!");


/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 */
const slashCommandFunction = async (client, interaction) => {
    const tryPong = await interaction.reply({ content: "Waiting for reply...", fetchReply: true });

    const embed = new EmbedBuilder()
        .setTitle('🏓 Pong!')
        .setURL('https://google.com')
        .setThumbnail(client.user.displayAvatarURL())
        .addFields([
            { name: 'API Latency', value: `\`${client.ws.ping}ms\``, inline: true },
            { name: 'BOT Latency', value: `\`${tryPong.createdTimestamp - interaction.createdTimestamp}ms\``, inline: true },
        ])
        .setTimestamp()
        .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL() });
    
    interaction.editReply({ content: ' ', embeds: [embed] });
}


module.exports = {
    data : slashCommandData,
    execute: slashCommandFunction,
}
