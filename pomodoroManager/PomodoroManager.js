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
			remainingMinutes: 0,
		};
		this.userNotification = userNotification;
		this.isCountdownVisible = false;
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
				this.stateMap[key] = new Timer(value);
			}
		}

		this.currentState.remainingMinutes = (this.stateMap[this.currentState.key]).getRemainingMinutes();

		this.initStates();
	}

	async initStates() {
		this.userNotification.informChannel('Pomodoro started !!!!');

		while (this.currentState.completedPomodoros < 6
			&& await this.stateMap[this.currentState.key].start()) {
			this.currentMinutes = this.currentMinutes + (this.stateMap[this.currentState.key].duration);

			if(this.currentState.key === 'workTime') {
				this.currentState.completedPomodoros = this.currentState.completedPomodoros + 1;

				if (this.currentState.completedPomodoros % this.timerSettings.iterations === 0) {
					this.currentState.key = 'longBreakTime';
				}
				else {
					this.currentState.key = 'breakTime';
				}
			}
			else {
				this.currentState.key = 'workTime';
			}
		}
	}

	async stopState() {
		// stops the current timer
		this.userNotification.informChannel('Stopping pomodoro');

		(this.stateMap[this.currentState.key]).stop();
	}

	async resumeState() {
		// resumes the current timer
		this.userNotification.informChannel('Resuming your pomodoro');

		this.initStates();
	}

	async resetState() {
		// resets the state timer,
		(this.stateMap[this.currentState.key]).reset();

		this.currentState.key = 'workTime';
		// yine inform user
	}

	async showCountdown() {
		if (Object.entries(this.stateMap).length > 0) {
			this.isCountdownVisible = true;
			const message = await this.userNotification.showPomCountdown(this.currentState);

			let prevState = (this.stateMap[this.currentState.key]).getRemainingMinutes();

			while (this.isCountdownVisible) {
				await new Promise((resolve) => setTimeout(() => {resolve(true);}, 500));

				this.currentState.remainingMinutes = (this.stateMap[this.currentState.key]).getRemainingMinutes();

				if (prevState !== this.currentState.remainingMinutes) {
					this.userNotification.updateCountdown(message, this.currentState);
				}

				prevState = this.currentState.remainingMinutes;
			}
		}
		else {
			this.userNotification.informChannel('There is not any running pomodoro, please start pom. For help use \'/pom help\'');
		}
	}

	async closeCountdown() {
		this.isCountdownVisible = false;
	}

	getCurrentState() {
		return this.currentState;
	}
}

module.exports = PomodoroManager;