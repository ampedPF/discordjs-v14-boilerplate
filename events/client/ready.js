const { Events } = require('discord.js');


module.exports = {
    name: Events.ClientReady,
    description: "Emitted when the client becomes ready to start working.",
    once: true,
    async execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        await client.guilds.cache.get(process.env.GUILD_ID).commands.set(client.commands.map(command => command.data));
    },
};
