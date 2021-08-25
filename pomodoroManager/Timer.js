const EventEmitter = require('events');

class Timer extends EventEmitter {
	constructor(duration) {
		super();

		this.duration = duration * 60;
		this.isRunning = false;
		this.startTime = 0;
		this.isStopped = false;
		this.remainingMinutes = duration;
	}

	start() {
		if (this.isRunning) {
			return false;
		}

		this.isStopped = false;
		this.isRunning = true;
		this.startTime = Date.now();

		this.identifier = setInterval(() => {this.timer();}, 1000);
	}

	reset() {
		this.isRunning = false;
	}

	stop() {
		if(this.isRunning) {
			this.isRunning = false;
			this.isStopped = true;
		}
		else {
			console.log('There is not any running timer, please start some TIMEEEER');
		}
	}

	timer() {
		let diff = this.duration - (((Date.now() - this.startTime) / 1000) | 0);
		this.remainingMinutes = Math.round(diff / 60);

		console.log(this.remainingMinutes);

		if(this.isStopped) {
			this.duration = diff;
			clearInterval(this.identifier);

			this.emit('stateChange');
		}

		if(!this.isRunning) {
			clearInterval(this.identifier);

			this.emit('stateChange');
		}

		if(diff < 0) {
			this.isRunning = false;
			diff = 0;
			this.remainingMinutes = 0;
			clearInterval(this.identifier);

			this.emit('stateChange');
		}
	}

	getDuration() {
		return this.duration;
	}

	getRemainingMinutes() {
		return this.remainingMinutes;
	}
}

module.exports = Timer;