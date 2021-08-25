const { SlashCommandBuilder, SlashCommandSubcommandBuilder, SlashCommandIntegerOption } = require('@discordjs/builders');
const PomConstants = require('../commandconsts/slashCommandConstants');
const UserNotification = require('../notification/UserNotification');
const PomodoroManager = require('../pomodoroManager/PomodoroManager');

const userNotification = new UserNotification();
const pomodoroManager = new PomodoroManager(userNotification);


module.exports = {
	data: new SlashCommandBuilder()
		.setName(PomConstants.POM)
		.setDescription(PomConstants.POM_DESC)
		.addSubcommand(new SlashCommandSubcommandBuilder ()
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
		)
		.addSubcommand(
			new SlashCommandSubcommandBuilder()
				.setName(PomConstants.POM_COMMAND_COUNTDOWN.SHOW)
				.setDescription(PomConstants.POM_COMMAND_COUNTDOWN.SHOW_DESC))
		.addSubcommand(
			new SlashCommandSubcommandBuilder()
				.setName(PomConstants.POM_COMMAND_COUNTDOWN.CLOSE)
				.setDescription(PomConstants.POM_COMMAND_COUNTDOWN.CLOSE_DESC),
		),
	async execute(interaction) {
		const subCommandName = interaction.options.getSubcommand();

		userNotification.setCurrentChannel(interaction.channel);

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

			await interaction.reply('Hey let\'s work together :) POOMMM');
		}
		else if (subCommandName === 'stop') {
			pomodoroManager.stopState();

			await interaction.reply('Stopping POOMMM');
		}
		else if (subCommandName === 'resume') {
			pomodoroManager.resumeState();

			await interaction.reply('Resuming POOMMM');
		}
		else if (subCommandName === 'reset') {
			pomodoroManager.resetState();

			await interaction.reply('Resetting POOMMM');
		}
		else if (subCommandName === 'countdownshow') {
			pomodoroManager.showCountdown();

			await interaction.reply('Showing POOMMM COUNTDOWNN BOOOOOM');
		}
		else if (subCommandName === 'countdownclose') {
			pomodoroManager.closeCountdown();

			await interaction.reply('Closing POOMMM COUNTDOWNN BOOOOOM');
		}
	},
};