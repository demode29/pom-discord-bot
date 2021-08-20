// Timer Manager ?? VERY IMPORTANT CLASS SINGLETON

// will check if timer exists

// will create a timer with specified config

// will stop, resume, clear timer
const { pomStartDefConfig } = require('../pom-default-conf.json');
const Timer = require('./Timer.js');

class TimerManager {
	constructor() {
		this.timerSettings = pomStartDefConfig;
		this.currentTimerKey = 'workTime';
		this.timerMap = {};
	}

	setInteraction(interaction) {
		this.interaction = interaction;
	}

	// singleton pattern
	createTimers(timerSettings) {
		// check if any timer exists
		if (this.timerMap[this.currentTimerKey] && this.timerMap[this.currentTimerKey].isRunning) {
			this.resetTimer();
		}

		const mergedTimer = {
			...this.timerSettings,
			...timerSettings,
		};

		this.timerSettings = mergedTimer;

		// minutes to seconds conversion and then create timers
		for (const [key, value] of Object.entries(this.timerSettings)) {
			this.timerMap[key] = new Timer(value * 60);
		}

		return this.initializeTimers();
	}

	initializeTimers() {
		this.recursiveTimer(this.timerSettings.iterations);

		return true;
	}

	recursiveTimer(iteration) {
		if (iteration !== 0) {
			(this.timerMap[this.currentTimerKey]).start((minutes) => {
				console.log(minutes);
			}, () => {
				console.log('Work time is finished');

				this.currentTimerKey = 'breakTime';

				(this.timerMap[this.currentTimerKey]).start((minutes) => {
					console.log(minutes);
				}, () => {
					console.log('Break time is finished');
					this.recursiveTimer(iteration - 1);
				});
			});
		}

		return;
	}

	stopTimer() {
		// stops the current timer
		(this.timerMap[this.currentTimerKey]).stop();
	}

	resumeTimer() {
		// resumes the current timer
		(this.timerMap[this.currentTimerKey]).resume();
	}

	resetTimer() {
		// resets the timer
		(this.timerMap[this.currentTimerKey]).reset();
	}

	async informUser(info) {
		const result = await this.interaction.channel.send(info);
		console.log(result);

		result.edit('heyyyyy');
		// await this.interaction.reply(info);
	}
}

module.exports = TimerManager;