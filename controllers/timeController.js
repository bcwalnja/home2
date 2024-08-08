class TimeController {
  constructor(context, gameLength) {
    log('TimeController instantiated');
    this.startTime = Date.now();
    this.context = context;
    this.gameLength = gameLength || 60;
    this.fontSize = Math.floor(context.canvas.height / 20);
    this.gameLength = gameLength;
  }

  renderTime() {
    this.context.save();
    this.context.textAlign = 'left';
    this.context.textBaseline = 'top';
    this.context.fillText(this.getTimeRemaining(), this.fontSize, this.fontSize);
    this.context.restore();
  }

  getTimeRemaining() {
    let elapsed = (Date.now() - this.startTime) / 1000;
    let remaining = this.gameLength - elapsed;
    if (remaining < 0) {
      remaining = 0;
    }
    return remaining.toFixed(0);
  }
}