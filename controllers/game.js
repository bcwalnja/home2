log('loaded game.js');
class Game {

  constructor(canvas, username, operation, term1min, term1max, term2min, term2max) {
    this.canvas = canvas;
    this.canvas.onclick = this.onCanvasClick;

    this.username = username;
    this.operation = operation;
    this.fontSize = Math.floor(this.canvas.height / 20);
    // TODO: add a control to allow the user to set the speed
    let speed = this.canvas.height * .0017;
    this.questionCoordinates = { x: canvas.width / 2, y: this.fontSize, dy: speed };

    this.context = this.canvas.getContext('2d');
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.font = this.fontSize + 'px Arial';
    this.context.fillStyle = 'white';

    this.term1min = term1min;
    this.term1max = term1max;
    this.term2min = term2min;
    this.term2max = term2max;
  }

  canvas;
  context;
  username;
  operation;
  questionCoordinates;


  onCanvasClick = (event) => {
    let x = event.clientX - canvas.getBoundingClientRect().left;
    let y = event.clientY - canvas.getBoundingClientRect().top;
    log('canvas clicked at:', x, y);
    var obj = this.clickController.onClick(x, y, this.answerController.answers);
    log('clicked object:', obj);
    if (obj) {
      let source = obj;
      let target = this.questionController.getFocusedQuestion();
      this.missileController.addMissile(source, target);
    }
    this.explosionController.createExplosion(x, y);
  }

  startGame() {
    this.questionController = new QuestionController(this.operation, this.term1min, this.term1max, this.term2min, this.term2max);
    this.answerController = new AnswerController(this.operation, this.term1min, this.term1max, this.term2min, this.term2max);
    this.clickController = new ClickController(this.context);
    this.explosionController = new ExplosionController(this.context);
    this.missileController = new MissileController(this.context);
    
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
    this.questionController.renderQuestions(this.context);
    this.answerController.renderAnswers(this.context);
    this.explosionController.renderExplosions();
    this.missileController.renderMissiles();
    requestAnimationFrame(this.animate.bind(this));
  }

  dispose() {
    this.disposing = true;
    this.canvas.onclick = null;
  }
}