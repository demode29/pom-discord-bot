module.exports = {
	name: 'interactionCreate',
	async execute(client, interaction) {
		// console.log(interaction);

		if (!interaction.isCommand()) return;

		const { commandName } = interaction;

		if (!client.slashcommands.has(commandName)) return;

		try {
			await client.slashcommands.get(commandName).execute(interaction);
		}
		catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
};