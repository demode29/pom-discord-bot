class Timer {
	constructor(duration) {
		this.duration = duration;
		this.isRunning = false;
		this.startTime = 0;
		this.isStopped = false;
	}

	start(callback, afterIntervalCallback) {
		if(this.isRunning) {
			return;
		}

		if(callback && typeof callback === 'function' && afterIntervalCallback
		&& typeof afterIntervalCallback === 'function') {
			this.isRunning = true;
			this.startTime = Date.now();
			this.callback = callback;
			this.afterIntervalCallback = afterIntervalCallback;
			this.identifier = setInterval(() => {this.timer();}, 1000);
		}
	}

	reset() {
		this.isRunning = false;
		this.identifier && clearInterval(this.identifier);
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

	resume() {
		if(this.isStopped) {
			console.log('resumed');

			this.isStopped = false;
			this.startTime = Date.now();
			this.identifier = setInterval(() => {this.timer();}, 1000);
		}
		else {
			console.log('There is not any stopped timer');
		}
	}

	timer() {
		let diff = this.duration - (((Date.now() - this.startTime) / 1000) | 0);
		const minutes = Math.round(diff / 60);

		if(this.isStopped) {
			// save remaining minutes
			this.duration = diff;
			clearInterval(this.identifier);

			return;
		}

		if(diff < 0) {
			this.isRunning = false;
			diff = 0;
			clearInterval(this.identifier);
			this.afterIntervalCallback();
		}
		else {
			this.callback(minutes);
		}
	}
}

module.exports = Timer;