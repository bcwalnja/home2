log('loaded game.js');
class Game {

  constructor(canvas, username, operation, term1min, term1max, term2min, term2max) {
    this.canvas = canvas;
    this.canvas.addEventListener('click', this.onCanvasClick.bind(this));

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

  // on click event.. I think it has to be initialized in the script.js, and then passed to the game object
  // and has to be called here in order to pass the answers and canvas to the clickController


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

    this.explosionController.createExplosion(x, y);
  }


  startGame() {
    //generate a new question
    this.questionController = new QuestionController(this.operation, this.term1min, this.term1max, this.term2min, this.term2max);
    this.questionController.generateNewQuestion(this.questionCoordinates);

    //generate new answers
    this.answerController = new AnswerController(this.operation, this.term1min, this.term1max, this.term2min, this.term2max);
    this.answerController.generateNewAnswers(this.canvas, this.questionController.correctAnswer);

    //initialize the click controller
    this.clickController = new ClickController(this.context);

    //explosion controller
    this.explosionController = new ExplosionController(this.context);

    this.animate();
  }

  animate() {
    if (this.disposing) {
      this.context.textAlign = 'center';
      this.context.fillText('Game Over', this.canvas.width / 2, this.canvas.height / 2);
      return;
    }
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.questionController.renderQuestions(this.context);
    this.answerController.renderAnswers(this.context);
    this.explosionController.renderExplosions();
    requestAnimationFrame(this.animate.bind(this));
  }

  dispose() {
    this.disposing = true;
    this.canvas.removeEventListener('click', this.onCanvasClick.bind(this));
  }
}