class Timer {
	constructor(duration) {
		this.duration = duration;
		// in seconds
		this.isRunning = false;
		this.startTime = 0;
	}

	// duration will be in minutes
	start(callback, afterIntervalCallback) {
		if(this.isRunning) {
			return;
		}
		this.startTime = Date.now();

		if(callback && typeof callback === 'function') {
			this.isRunning = true;
			this.identifier = setInterval(() => {this.timer(callback, afterIntervalCallback);}, 1000);
		}
	}

	reset() {
		this.isRunning = false;
		this.identifier && clearInterval(this.identifier);
	}

	timer(callback, afterIntervalCallback) {
		let diff = this.duration - (((Date.now() - this.startTime) / 1000) | 0);
		const minutes = Math.round(diff / 60);

		if(diff < 0) {
			this.isRunning = false;
			diff = 0;
			clearInterval(this.identifier);
			afterIntervalCallback();
		}

		/* if (diff > 0) {
			setTimeout(this.timer(callback), 1000);
		}
		else {
			diff = 0;
			this.isRunning = false;
		} */

		callback(minutes);
	}
}

module.exports = Timer;