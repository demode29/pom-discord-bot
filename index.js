const { Client, Collection, Intents } = require('discord.js');
const { token, application_id, guild_id } = require('./config.json');
const registerSlashCommands = require('./registerSlashCommands');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const slashCommandFiles = fs.readdirSync('./slashcommands').filter(file => file.endsWith('.js'));

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

// set slash commands
client.slashcommands = new Collection();

for (const file of slashCommandFiles) {
	const slashCommand = require(`./slashcommands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.slashcommands.set(slashCommand.data.name, slashCommand);
}


// bind events
for (const file of eventFiles) {
	const event = require(`./events/${file}`);

	if (event.once) {
		client.once(event.name, (...args) => event.execute(client, ...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(client, ...args));
	}
}

// Register Slash commands
const rest = new REST({ version: '9' }).setToken(token);

client.routeUrl = Routes.applicationGuildCommands(application_id, guild_id);

registerSlashCommands(client, rest);

client.login(token);