const { MessageEmbed } = require('discord.js');

class UserNotification {
	constructor() {
		this.currentChannel = {};
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
		return true;
	}

	async showPomCountdown() {
		return true;
	}

	setCurrentChannel(currentChannel) {
		this.currentChannel = currentChannel;
	}
}

module.exports = UserNotification;