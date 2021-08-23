class Timer {
	constructor(duration) {
		this.duration = duration * 60;
		this.isRunning = false;
		this.startTime = 0;
		this.isStopped = false;
		this.remainingMinutes = duration;
	}

	async start() {
		if (this.isRunning) {
			return false;
		}

		this.isStopped = false;
		this.isRunning = true;
		this.startTime = Date.now();

		return new Promise((resolve) => this.identifier = setInterval(() => {this.timer(resolve);}, 1000));
	}

	async reset() {
		this.isRunning = false;
	}

	async stop() {
		if(this.isRunning) {
			this.isRunning = false;
			this.isStopped = true;
		}
		else {
			console.log('There is not any running timer, please start some TIMEEEER');
		}
	}

	async timer(resolve) {
		let diff = this.duration - (((Date.now() - this.startTime) / 1000) | 0);
		this.remainingMinutes = Math.round(diff / 60);

		console.log(this.remainingMinutes);

		if(this.isStopped) {
			this.duration = diff;
			clearInterval(this.identifier);

			return resolve(false);
		}

		if(!this.isRunning) {
			clearInterval(this.identifier);

			return resolve(false);
		}

		if(diff < 0) {
			this.isRunning = false;
			diff = 0;
			this.remainingMinutes = 0;
			clearInterval(this.identifier);
			return resolve(true);
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