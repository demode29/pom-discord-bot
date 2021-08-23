// Timer Manager ?? VERY IMPORTANT CLASS SINGLETON

// will check if timer exists

// will create a timer with specified config

// will stop, resume, clear timer
const { pomStartDefConfig } = require('../pom-default-conf.json');
const Timer = require('./Timer.js');

class PomodoroManager {
	// user notification object must be here
	constructor(userNotification) {
		this.timerSettings = pomStartDefConfig;
		this.stateMap = {};
		this.totalTimeSpent = 0;
		this.currentState = {
			completedPomodoros: 0,
			key: 'workTime',
		};
		this.userNotification = userNotification;
	}

	async initPomodoro(timerSettings) {
		// check if any timer exists
		if (this.stateMap[this.currentState.key]
			&& this.stateMap[this.currentState.key].isRunning) {
			console.log('waiting for reset');
			const code = await this.resetState();
			console.log('reset is', code);
		}

		const mergedTimer = {
			...this.timerSettings,
			...timerSettings,
		};

		this.timerSettings = mergedTimer;

		this.userNotification.showCurrentSettings(this.timerSettings);

		// minutes to seconds conversion and then create timers
		for (const [key, value] of Object.entries(this.timerSettings)) {
			if (key !== 'iterations') {
				this.stateMap[key] = new Timer(value * 60);
			}
		}

		this.initStates();

		return true;
	}

	async initStates() {
		while (this.currentState.completedPomodoros < 6
			&& await this.stateMap[this.currentState.key].start()) {
			// transition state
			console.log('Transitioning state');
			this.currentMinutes = this.currentMinutes + (this.stateMap[this.currentState.key].duration);

			if(this.currentState.key === 'workTime') {
				this.currentState.completedPomodoros = this.currentState.completedPomodoros + 1;

				if (this.currentState.completedPomodoros % this.timerSettings.iterations === 0) {
					console.log('Transitioning into long break state');
					this.currentState.key = 'longBreakTime';

					// await reply burada olmalı

					// eğer reply no ise direk break loop, evet devam ise work time ı yine setle
				}
				else {
					console.log('Transitioning into break state');
					this.currentState.key = 'breakTime';

					// inform user
				}
			}
			else {
				console.log('Transitioning into work state');
				this.currentState.key = 'workTime';
			}
		}
	}

	async stopState() {
		// stops the current timer

		(this.stateMap[this.currentState.key]).stop();
	}

	async resumeState() {
		// resumes the current timer

		this.initStates();
	}

	async resetState() {
		// resets the state timer,
		(this.stateMap[this.currentState.key]).reset();

		this.currentState.key = 'workTime';
		// yine inform user
	}

	getCurrentState() {
		return this.currentState;
	}

	/*
	async informUser(info) {
		const result = await this.interaction.channel.send(info);
		console.log(result);

		result.edit('heyyyyy');
		// await this.interaction.reply(info);
	} */
}

module.exports = PomodoroManager;