log('loaded game.js');
class Game {
  canvas;
  context;
  username;
  operation;

  constructor(canvas, username, operation, term1min, term1max, term2min, term2max, gameLength) {
    this.canvas = canvas;
    this.canvas.onclick = this.onCanvasClick;
    this.canvas.textBaseline = 'top';
    this.canvas.textAlign = 'center';

    this.username = username;
    this.operation = operation;
    this.fontSize = Math.floor(this.canvas.height / 20);

    this.context = this.canvas.getContext('2d');
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.font = this.fontSize + 'px Arial';
    this.context.fillStyle = 'white';
    this.context.strokeStyle = 'white';
    this.context.lineWidth = 2;

    this.term1min = term1min;
    this.term1max = term1max;
    this.term2min = term2min;
    this.term2max = term2max;

    this.gameLength = gameLength;
  }

  onCanvasClick = (event) => {
    let x = event.clientX - canvas.getBoundingClientRect().left;
    let y = event.clientY - canvas.getBoundingClientRect().top;
    log('canvas clicked at:', x, y);
    var answer = this.clickController.onClick(x, y, this.answerController.answers);

    if (answer) {
      log('clicked answer:', answer);
      let source = answer;
      let target = this.questionController.getFocusedQuestion();
      let isCorrectAnswer = answer.text === this.questionController.getCorrectAnswer();
      this.missileController.addMissile(source, target, isCorrectAnswer);
      this.scoreController.incrementAttempts();
      if (isCorrectAnswer) {
        this.questionController.generateNewQuestion(this.questionCoordinates);
        this.answerController.generateNewAnswers(this.canvas, this.questionController.getCorrectAnswer());
      } else {
        this.answerController.removeAnswer(answer);
      }
    }
    this.explosionController.createExplosion(x, y);
  }

  startGame() {
    this.questionController = new QuestionController(this.context, this.operation, this.term1min, this.term1max, this.term2min, this.term2max);
    this.answerController = new AnswerController(this.operation, this.term1min, this.term1max, this.term2min, this.term2max);
    this.clickController = new ClickController(this.context);
    this.explosionController = new ExplosionController(this.context);
    this.missileController = new MissileController(this.context);
    this.timeController = new TimeController(this.context, this.gameLength);
    this.scoreController = new ScoreController(this.context);

    this.questionController.generateNewQuestion(this.questionCoordinates);
    this.answerController.generateNewAnswers(this.canvas, this.questionController.getCorrectAnswer());
    this.animate();
  }

  animate() {
    if (this.disposing) {
      this.gameOver();
      return;
    }
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.handleQuestionAnswered();

    this.questionController.renderQuestions(this.context);
    this.answerController.renderAnswers(this.context);
    this.explosionController.renderExplosions();
    this.missileController.renderMissiles();
    this.timeController.renderTime(this.context);
    this.scoreController.renderScore();

    if (this.timeController.getTimeRemaining() <= 0) {
      this.timeExpired();
      this.dispose();
    }

    requestAnimationFrame(this.animate.bind(this));
  }

  handleQuestionAnswered() {
    let result = this.questionController.isQuestionAnswered(this.missileController.missiles);
    if (result) {
      log('question answered:', result.q);
      this.explosionController.createExplosion(result.q.x, result.q.y);
      this.missileController.removeMissile();
      this.questionController.removeQuestion(result.q);
      this.scoreController.incrementScore();
      this.missileController.removeMissile(result.m);
    }

    let expiredQ = this.questionController.isQuestionExpired(this.canvas);
    if (expiredQ) {
      log('question expired:', expiredQ);
      this.explosionController.createExplosion(expiredQ.x, expiredQ.y);
      this.questionController.removeQuestion(expiredQ);
      // if there's a missile targeting the expired question, remove it
      if (this.missileController.missiles.length > 0) {
        this.missileController.removeMissile();
      } else {
        this.questionController.generateNewQuestion(this.questionCoordinates);
        this.answerController.generateNewAnswers(this.canvas, this.questionController.getCorrectAnswer());
      }
    }
  }

  gameOver() {
    const value = (score, attempts) => {
      if (!attempts) {
        return 0;
      }
      var percent = score / attempts * 100;
      return Math.round(score * percent);
    }

    let attempts = this.scoreController.attempts;
    let score = this.scoreController.score;

    let scores = JSON.parse(localStorage.getItem('scores')) || [];
    let highScore = scores.find(s => s.username === this.username);

    if (highScore) {
      if (this.scoreController.getScoreValue() > value(highScore.score, highScore.attempts)) {
        highScore.score = score;
        highScore.attempts = attempts;
      }
    } else {
      highScore = { username: this.username, score: score, attempts: attempts };
      scores.push(highScore);
    }

    localStorage.setItem('scores', JSON.stringify(scores));

    let scoretext = this.username + '\'s Score: ';
    scoretext += score + ' Correct, ' + Math.round(score / attempts * 100) + '% Accuracy,  ';
    scoretext += 'Total: ' + value(score, attempts);
    let highscoretext = this.username + '\'s High Score: ' + value(highScore.score, highScore.attempts);
    let x = this.canvas.width / 2;
    let y = this.canvas.height / 2;

    this.context.save();
    this.context.textAlign = 'center';
    this.context.fillText('Game Over', x, y);
    this.context.restore();

    this.context.save();
    this.context.textAlign = 'center';
    this.context.font = Math.floor(this.fontSize * .7) + 'px Arial';
    this.context.fillText(scoretext, x, y + this.fontSize * 2);
    this.context.fillText(highscoretext, x, y + this.fontSize * 3);
    this.context.restore();

  }

  dispose() {
    // todo: add a way that the game can tell main.js to run its reset code
    this.disposing = true;
    this.canvas.onclick = null;
  }
}