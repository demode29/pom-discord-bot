const { MessageEmbed } = require('discord.js');

class UserNotification {
	constructor() {
		this.currentChannel = {};
		this.currentCountDownEmbed = new MessageEmbed();
	}

	async showCurrentSettings(currentSettings) {
		const currentSettingsEmbed = new MessageEmbed();

		currentSettingsEmbed
			.setTitle('Current Pom Settings').setColor('#7289da')
			.addFields(
				{ name: 'Work duration', value: `${currentSettings.workTime} min` },
				{ name: 'Break duration', value: `${currentSettings.breakTime} min` },
				{ name: 'Long break duration', value: `${currentSettings.longBreakTime} min` },
				{ name: 'Iteration count', value: `${currentSettings.iterations} times` },
			);

		this.currentChannel.send({ embeds: [currentSettingsEmbed] });
	}

	async informChannel(text) {
		this.currentChannel.send(text);
	}

	// returns state title and state color
	parseState(stateKey) {
		if (stateKey === 'workTime') {
			return {
				stateTitle: 'Work Time',
				stateColor: '#f58cc5',
			};
		}
		else if(stateKey === 'breakTime') {
			return {
				stateTitle: 'Break Time',
				stateColor: '#b5ff3d',
			};
		}
		else {
			return {
				stateTitle: 'Long Break Time',
				stateColor: '#ffaca6',
			};
		}
	}

	async showPomCountdown(currentState) {
		const parsedState = this.parseState(currentState.key);

		this.currentCountDownEmbed.setTitle(parsedState.stateTitle).setColor(parsedState.stateColor)
			.addFields(
				{ name: 'Remaining Time', value: `${currentState.remainingMinutes} min left` },
			);

		return await this.currentChannel.send({ embeds: [this.currentCountDownEmbed] });
	}

	async updateCountdown(message, currentState) {
		const parsedState = this.parseState(currentState.key);

		this.currentCountDownEmbed
			.setTitle(parsedState.stateTitle).setColor(parsedState.stateColor).setFields({
				name: 'Remaining Time', value: `${currentState.remainingMinutes} min left`,
			});

		message.edit({ embeds: [this.currentCountDownEmbed] });
	}

	async closeCountdown(message) {
		message.edit({ embeds: [] });
	}

	setCurrentChannel(currentChannel) {
		this.currentChannel = currentChannel;
	}
}

module.exports = UserNotification;