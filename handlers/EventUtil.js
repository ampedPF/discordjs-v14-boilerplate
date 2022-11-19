const { Events } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');


module.exports = (client) => {
    const eventFolder = path.join(appRoot,'events');
    fs.readdirSync(eventFolder).forEach(async eventDirectory => {
        const eventSubFolder = path.join(eventFolder, eventDirectory);
		for(const eventFile of fs.readdirSync(eventSubFolder).filter(eventFile => eventFile.endsWith('.js'))) {
            const eventPath = path.join(eventSubFolder, eventFile);
            const event = require(eventPath);
                    
            if (!event.name) return console.log(`-----\nERROR while loading Event\nMissing property "name"\nFile -> ${eventFile}\n-----`);
            if (!Object.values(Events).includes(event.name)) return console.log(`-----\nERROR while loading Event\nInvalid property "name": ${event.name}\nFile -> ${eventFile}\n-----`);
            if (!event.description) return console.log(`-----\nERROR while loading event\nMissing property "description"\nFile -> ${eventFile}\n-----`);

            if (event.once) {
                client.once(event.name, (...args) => event.execute(client, ...args));
            } else {
                client.on(event.name, (...args) => event.execute(client, ...args));
            }
            console.log("Successfully loaded [Event]\t", event.name);
        }
    })
};
