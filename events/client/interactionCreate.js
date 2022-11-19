const { Events, InteractionType } = require('discord.js');


module.exports = {
    name: Events.InteractionCreate,
    description: "Emitted when the client becomes ready to start working.",
    once: false,
    async execute(client, interaction) {
        if(interaction.type == InteractionType.ApplicationCommand) {
            const command = client.commands.get(interaction.commandName);
            
            if (!command) return interaction.reply('This command does not exist.');
    
            command.execute(client, interaction);
        }
    },
};
