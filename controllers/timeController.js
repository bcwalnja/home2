class TimeController {
  constructor() {
    log('TimeController instantiated');
    this.startTime = Date.now();
    // TODO: maybe allow the user to set the game length?
    this.gameLength = 5;
  }

  renderTime(context) {
    if (!this.fontSize) {
      this.fontSize = Math.floor(context.canvas.height / 20);
    }
    
    context.save();
    context.textAlign = 'left';
    context.textBaseline = 'top';
    context.fillText(this.getTimeRemaining(), this.fontSize, this.fontSize);
    context.restore();
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