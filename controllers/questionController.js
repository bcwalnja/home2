class QuestionController {
  questions = {};
  lastId = 0;

  constructor(context, operation, term1Min, term1Max, term2Min, term2Max, difficulty) {
    this.context = context;
    this.canvas = context.canvas;
    this.fontSize = parseInt(context.font.split('px')[0]);
    this.padding = canvas.height * 0.02;

    switch (difficulty) {
      case 'medium':
      this.fallSpeed = canvas.height * .0017;
      break;
      case 'hard':
      this.fallSpeed = canvas.height * .003;
      break;
      default:
      this.fallSpeed = canvas.height * .001;
      break;
    }

    this.operation = operation;
    this.term1Min = term1Min;
    this.term1Max = term1Max;
    this.term2Min = term2Min;
    this.term2Max = term2Max;
  }

  /*
  This code had been defined in game.js, but I want to move it to here:

  get questionCoordinates() {
    // I want to pick an initial x value randomly across the top of the canvas, a y value of fontSize
    // and a dy value of this.speed
    // then I want to pick a dx value that will move the question down to a random x value
    // that is within the canvas width, and a y value of canvas.height - fontSize * 3
    let padding = this.fontSize * 3;
    let x = rand(padding, this.canvas.width - padding);
    let y = this.fontSize;
    let dy = this.fallSpeed;

    let targetX = rand(padding, this.canvas.width - padding);
    let targetY = this.canvas.height - padding;

    let dx = (targetX - x) / (targetY - y) * dy;

    return { x, y, dx, dy };
  }
  */

  get questionCoordinates() {
    let padding = this.fontSize * 3;
    let x = rand(padding, this.canvas.width - padding);
    let y = this.fontSize;
    let dy = this.fallSpeed;

    let targetX = rand(padding, this.canvas.width - padding);
    let targetY = this.canvas.height - padding;

    let dx = (targetX - x) / (targetY - y) * dy;

    return { x, y, dx, dy };
  }

  getCorrectAnswer() {
    return this.getFocusedQuestion().answer;
  }

  getFocusedQuestion() {
    for (const key of Object.keys(this.questions)) {
      const q = this.questions[key];
      if (q.focused) {
        return q;
      }
    }
  }

  getNextId() {
    return this.lastId++;
  }

  generateNewQuestion() {
    let { x, y, dx, dy } = this.questionCoordinates;
    log('generating a new question');

    var newQ = {};
    newQ.id = this.getNextId();
    switch (this.operation) {
      case 'multiplication':
        this.getMultiplicationQuestion(newQ);
        break;
      case 'division':
        this.getDivisionQuestion(newQ);
        break;
      case 'addition':
        this.getAdditionQuestion(newQ);
        break;
      case 'subtraction':
        this.getSubtractionQuestion(newQ);
        break;
      default:
        throw new Error('Invalid operation: ' + this.operation);
    }

    newQ.x = x;
    newQ.y = y;
    newQ.dx = 0;
    newQ.dx = dx;
    newQ.dy = dy;
    //only this question should be focused
    for (const key of Object.keys(this.questions)) {
      this.questions[key].focused = false;
    }
    newQ.focused = true;
    this.questions[newQ.id] = newQ;

    return newQ;
  }

  getMultiplicationQuestion(q1) {
    q1.term1 = rand(this.term1Min, this.term1Max);
    q1.term2 = rand(this.term2Min, this.term2Max);
    q1.answer = q1.term1 * q1.term2;
    q1.text = q1.term1 + ' * ' + q1.term2 + ' = ?';
  }

  getDivisionQuestion(q1) {
    q1.term1 = rand(this.term1Min, this.term1Max);
    q1.answer = rand(this.term2Min, this.term2Max);
    q1.term2 = q1.term1 * q1.answer;
    q1.text = q1.term2 + ' / ' + q1.term1 + ' = ?';
  }

  getAdditionQuestion(q1) {
    q1.answer = rand(this.term1Min, this.term1Max);
    q1.term1 = rand(0, q1.answer - 1);
    q1.term2 = q1.answer - q1.term1;
    q1.text = q1.term1 + ' + ' + q1.term2 + ' = ?';
  }

  getSubtractionQuestion(q1) {
    q1.term1 = rand(this.term1Min, this.term1Max);
    q1.term2 = rand(0, q1.term1);
    q1.answer = q1.term1 - q1.term2;
    q1.text = q1.term1 + ' - ' + q1.term2 + ' = ?';
  }

  renderQuestions() {
    for (const key of Object.keys(this.questions)) {
      const q = this.questions[key];
      q.x += q.dx;
      q.y += q.dy;
      this.context.fillText(q.text, q.x, q.y);

      if (q.focused) {
        let width = this.context.measureText(q.text).width;
        let fontSize = parseInt(this.context.font.split('px')[0]);
        this.context.strokeRect(
          q.x,
          q.y - fontSize,
          width,
          fontSize * 1.25
        );
      }
    }
  }

  isQuestionAnswered(missiles) {
    for (const key of Object.keys(this.questions)) {
      const q = this.questions[key];
      for (const m of missiles) {
        if (m.isCorrectAnswer &&
          m.target === q.id &&
          m.x > q.x - this.padding &&
          m.x < q.x + this.padding &&
          m.y > q.y - this.padding &&
          m.y < q.y + this.padding) {
          return {q, m};
        }
      }
    }
    return null;
  }

  isQuestionExpired() {
    const padding = this.canvas.height * 0.1;
    for (const key of Object.keys(this.questions)) {
      const q = this.questions[key];
      if (q.y > this.canvas.height - padding) {
        return q;
      }
    }
  }

  removeQuestion(q) {
    delete this.questions[q.id];
  }
}