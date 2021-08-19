// Timer Manager ?? VERY IMPORTANT CLASS SINGLETON

// will check if timer exists

// will create a timer with specified config

// will stop, resume, clear timer
const { pomStartDefConfig } = require('../pom-default-conf.json');
// const Timeout = require('smart-timeout');

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
		(this.timerMap[this.currentTimerKey]).start((minutes) => {
			console.log(minutes);
		}, () => {
			console.log('Function is finished');
		});

		return true;
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

/* return Timeout.create(this.timerKey,
	() => {
			console.log('CREATEEEED');
			this.timerKey = 'break-pom';

			this.informUser('Study time is over!!! Let\'s have a POOM break');

	}, this.timerSettings.workTime); */