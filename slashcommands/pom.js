const { SlashCommandBuilder, SlashCommandSubcommandBuilder, SlashCommandIntegerOption } = require('@discordjs/builders');
const PomConstants = require('../commandconsts/slashCommandConstants');
const PomodoroManager = require('../pomodoroManager/PomodoroManager.js');

const pomodoroManager = new PomodoroManager();

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
		)
		.addSubcommand(
			new SlashCommandSubcommandBuilder()
				.setName(PomConstants.POM_COMMAND_STOP.STOP)
				.setDescription(PomConstants.POM_COMMAND_STOP.STOP_DESC),
		)
		.addSubcommand(
			new SlashCommandSubcommandBuilder()
				.setName(PomConstants.POM_COMMAND_RESUME.RESUME)
				.setDescription(PomConstants.POM_COMMAND_RESUME.RESUME_DESC),
		)
		.addSubcommand(
			new SlashCommandSubcommandBuilder()
				.setName(PomConstants.POM_COMMAND_RESET.RESET)
				.setDescription(PomConstants.POM_COMMAND_RESET.RESET_DESC),
		),
	async execute(interaction) {
		// timerManager.setInteraction(interaction);
		const subCommandName = interaction.options.getSubcommand();

		if (subCommandName === 'start') {
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
			pomodoroManager.initPomodoro(pomStartSettings);
		}
		else if (subCommandName === 'stop') {
			pomodoroManager.stopState();
		}
		else if (subCommandName === 'resume') {
			pomodoroManager.resumeState();
		}
		else if (subCommandName === 'reset') {
			pomodoroManager.resetState();
		}

		await interaction.reply('Hey let\'s work together :) POOMMM');
	},
};