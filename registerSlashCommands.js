// const { REST } = require('@discordjs/rest');
// const { Routes } = require('discord-api-types/v9');

module.exports = async (client, rest) => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			client.routeUrl,
			{
				body: client.slashcommands.map(slashCommand => slashCommand.data.toJSON()),
			},
		);

		console.log('Successfully reloaded application (/) commands.');
	}
	catch (error) {
		console.error(error);
	}
};