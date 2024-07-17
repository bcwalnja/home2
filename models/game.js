log('loaded game.js');
class Game {
  //trying to think what pieces I need for this math shooter game...
  // questions, answers, missiles, score, time, math operation, do I also want username?
  // the constructor probably only needs username and operation
  constructor(canvas, username, operation) {
    this.canvas = canvas;
    this.username = username;
    this.operation = operation;
    this.fontSize = Math.floor(this.canvas.height / 20);
    this.questionCoordinates = { x: canvas.width / 2, y: this.fontSize, dy: this.canvas.height / 600 };

    this.context = this.canvas.getContext('2d');
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.font = this.fontSize + 'px Arial';
    this.context.fillStyle = 'white';
  }

  canvas;
  context;
  username;
  operation;
  questionCoordinates;

  startGame() {
    //generate a new question
    this.questionController = new QuestionController(this.operation, 1, 10, 1, 10);
    this.questionController.generateNewQuestion(this.questionCoordinates);

    this.animate();
  }

  animate() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.questionController.renderQuestions(this.context);
    requestAnimationFrame(this.animate.bind(this));
  }
}