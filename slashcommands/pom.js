const { SlashCommandBuilder, SlashCommandSubcommandBuilder, SlashCommandIntegerOption } = require('@discordjs/builders');
const PomConstants = require('../commandconsts/slashCommandConstants');
const TimerManager = require('../timerManager/TimerManager.js');

const timerManager = new TimerManager();

module.exports = {
	data: new SlashCommandBuilder()
		.setName(PomConstants.POM)
		.setDescription(PomConstants.POM_DESC)
		.addSubcommand(
			new SlashCommandSubcommandBuilder()
				.setName(PomConstants.POM_COMMAND_START.START)
				.setDescription(PomConstants.POM_COMMAND_START.START_DESC)
				.addIntegerOption(
					new SlashCommandIntegerOption()
						.setName(PomConstants.POM_COMMAND_START.WORK_TIME)
						.setDescription(PomConstants.POM_COMMAND_START.WORK_DESC))
				.addIntegerOption(
					new SlashCommandIntegerOption()
						.setName(PomConstants.POM_COMMAND_START.BREAK_TIME)
						.setDescription(PomConstants.POM_COMMAND_START.BREAK_DESC))
				.addIntegerOption(
					new SlashCommandIntegerOption()
						.setName(PomConstants.POM_COMMAND_START.LONG_BREAK_TIME)
						.setDescription(PomConstants.POM_COMMAND_START.LONG_BREAK_DESC))
				.addIntegerOption(
					new SlashCommandIntegerOption()
						.setName(PomConstants.POM_COMMAND_START.ITERATIONS)
						.setDescription(PomConstants.POM_COMMAND_START.ITERATIONS_DESC)),
		),
	async execute(interaction) {
		// if work-time or break-time or long-break-time or iterations are not specified use default settings
		const pomStartSettings = {
			workTime: interaction.options
				.getInteger(PomConstants.POM_COMMAND_START.WORK_TIME),
			breakTime: interaction.options
				.getInteger(PomConstants.POM_COMMAND_START.BREAK_TIME),
			longBreakTime: interaction.options
				.getInteger(PomConstants.POM_COMMAND_START.LONG_BREAK_TIME),
			iterations: interaction.options
				.getInteger(PomConstants.POM_COMMAND_START.ITERATIONS),
		};
		// check if there exist timer


		timerManager.createTimers(pomStartSettings);

		timerManager.setInteraction(interaction);
		// if exists reset

		// else create new timer class with config

		// console.log(pomStartSettings);
		await interaction.reply('Hey let\'s work together :) POOMMM');
	},
};