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
				{ name: 'Iteration count', value: `${currentSettings.iterations} min` },
			);

		this.currentChannel.send({ embeds: [currentSettingsEmbed] });
	}

	async informChannel(text) {
		this.currentChannel.send(text);
	}

	async showPomCountdown(currentState) {
		this.currentCountDownEmbed.setTitle('Pom Timer').setColor('#f58cc5')
			.addFields(
				{ name: 'Remaining Time', value: `${currentState.remainingMinutes} min left` },
			);

		return await this.currentChannel.send({ embeds: [this.currentCountDownEmbed] });
	}

	async updateCountdown(message, currentState) {
		console.log('updating countdown');

		this.currentCountDownEmbed.setFields({
			name: 'Remaining Time', value: `${currentState.remainingMinutes} min left`,
		});

		message.edit({ embeds: [this.currentCountDownEmbed] });
	}

	setCurrentChannel(currentChannel) {
		this.currentChannel = currentChannel;
	}
}

module.exports = UserNotification;