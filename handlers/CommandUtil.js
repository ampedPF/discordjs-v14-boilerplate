const fs = require('node:fs');
const path = require('node:path');


module.exports = (client) => {
    const commandFolder = path.join(appRoot,'commands');
    fs.readdirSync(commandFolder).forEach(async commandDirectory => {
        const commandSubFolder = path.join(commandFolder, commandDirectory);
		for(const commandFile of fs.readdirSync(commandSubFolder).filter(commandFile => commandFile.endsWith('.js'))) {
            const commandPath = path.join(commandSubFolder, commandFile);
            const command = require(commandPath);
            
            // Set a new item in the Collection with the key as the command name and the value as the exported module
            if ('data' in command && command.data.name && 'execute' in command) {
                client.commands.set(command.data.name, command);
                console.log("Successfully loaded [Command]\t", command.data.name);
            } else {
                console.log(`[WARNING] The command at ${commandPath} is missing a required "data", "data.name" or "execute" property.`);
            }
        }
    });
};
