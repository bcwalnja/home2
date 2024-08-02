class ScoreController {
    constructor(context) {
        log('ScoreController instantiated');
        this.score = 0;
        this.fontSize = Math.floor(context.canvas.height / 20);
        this.context = context;

        this.attempts = 0;
    }

    renderScore() {
        this.context.save();
        this.context.textAlign = 'right';
        this.context.textBaseline = 'top';
        this.context.fillText(this.getScoreValue(), this.context.canvas.width - this.fontSize, this.fontSize);
        this.context.restore();
    }

    getScoreValue() {
      if (this.attempts === 0) {
        return 0;
      }
      var percent = this.score / this.attempts * 100;
      return Math.round(this.score * percent);
    }

    incrementAttempts() {
        this.attempts++;
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