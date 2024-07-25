log('loaded game.js');
class Game {

  constructor(canvas, username, operation, term1min, term1max, term2min, term2max) {
    this.canvas = canvas;
    this.canvas.onclick = this.onCanvasClick;
    this.canvas.textBaseline = 'top';
    this.canvas.textAlign = 'center';

    this.username = username;
    this.operation = operation;
    this.fontSize = Math.floor(this.canvas.height / 20);
    // TODO: add a control to allow the user to set the speed
    this.speed = this.canvas.height * .0017;
    

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
  }

  canvas;
  context;
  username;
  operation;
  get questionCoordinates() {
    // I want to pick an initial x value randomly across the top of the canvas, a y value of fontSize
    // and a dy value of this.speed
    // then I want to pick a dx value that will move the question down to a random x value
    // that is within the canvas width, and a y value of canvas.height - fontSize * 3
    let padding = this.fontSize * 3;
    let x = rand(padding, this.canvas.width - padding);
    let y = this.fontSize;
    let dy = this.speed;

    let targetX = rand(padding, this.canvas.width - padding);
    let targetY = this.canvas.height - padding;

    let dx = (targetX - x) / (targetY - y) * dy;

    return { x, y, dx, dy };
  }

  onCanvasClick = (event) => {
    let x = event.clientX - canvas.getBoundingClientRect().left;
    let y = event.clientY - canvas.getBoundingClientRect().top;
    log('canvas clicked at:', x, y);
    var answer = this.clickController.onClick(x, y, this.answerController.answers);
    log('clicked answer:', answer);
    if (answer) {
      let source = answer;
      let target = this.questionController.getFocusedQuestion();
      this.missileController.addMissile(source, target);
      this.questionController.generateNewQuestion(this.questionCoordinates);
      this.answerController.generateNewAnswers(this.canvas, this.questionController.getCorrectAnswer());
    }
    this.explosionController.createExplosion(x, y);
  }

  startGame() {
    this.questionController = new QuestionController(this.operation, this.term1min, this.term1max, this.term2min, this.term2max);
    this.answerController = new AnswerController(this.operation, this.term1min, this.term1max, this.term2min, this.term2max);
    this.clickController = new ClickController(this.context);
    this.explosionController = new ExplosionController(this.context);
    this.missileController = new MissileController(this.context);
    this.timeController = new TimeController();
    
    this.questionController.generateNewQuestion(this.questionCoordinates);
    this.answerController.generateNewAnswers(this.canvas, this.questionController.getCorrectAnswer());
    this.animate();
  }

  animate() {
    if (this.disposing) {
      this.context.save();
      this.context.textAlign = 'center';
      this.context.fillText('Game Over', this.canvas.width / 2, this.canvas.height / 2);
      this.context.restore();
      return;
    }
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.handleQuestionAnswered();

    this.questionController.renderQuestions(this.context);
    this.answerController.renderAnswers(this.context);
    this.explosionController.renderExplosions();
    this.missileController.renderMissiles();
    this.timeController.renderTime(this.context);

    requestAnimationFrame(this.animate.bind(this));
  }

  handleQuestionAnswered() {
    let answeredQ = this.questionController.isQuestionAnswered(this.missileController.missiles, this.canvas);
    if (answeredQ) {
      log('question answered:', answeredQ);
      this.explosionController.createExplosion(answeredQ.x, answeredQ.y);
      this.missileController.removeMissile();
      this.questionController.removeQuestion(answeredQ);
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

  dispose() {
    this.disposing = true;
    this.canvas.onclick = null;
  }
}