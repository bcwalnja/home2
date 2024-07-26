class ScoreController {
    /* Sample code from the TimeController constructor() {
    log('TimeController instantiated');
    this.startTime = Date.now();
    // TODO: maybe allow the user to set the game length?
    this.gameLength = 120;
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
  }*/

    constructor(context) {
        log('ScoreController instantiated');
        this.score = 0;
        this.fontSize = Math.floor(context.canvas.height / 20);
        this.context = context;
    }

    renderScore() {
        this.context.save();
        this.context.textAlign = 'right';
        this.context.textBaseline = 'top';
        this.context.fillText(this.getScore(), this.context.canvas.width - this.fontSize, this.fontSize);
        this.context.restore();
    }

    getScore() {
        return this.score;
    }

    incrementScore(value) {
        if (value) {
            this.score += value;
        } else {
            this.score++;
        }
    }

    decrementScore() {
        this.score--;
    }
}