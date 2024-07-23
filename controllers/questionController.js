class QuestionController {
  questions = {};
  lastId = 0;

  constructor(operation, term1Min, term1Max, term2Min, term2Max) {
    this.operation = operation;
    this.term1Min = term1Min;
    this.term1Max = term1Max;
    this.term2Min = term2Min;
    this.term2Max = term2Max;
  }

  getCorrectAnswer() {
    for (const key of Object.keys(this.questions)) {
      const q = this.questions[key];
      if (q.complete) {
        continue;
      }
      return q.answer;
    }
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

  generateNewQuestion({ x, y, dy }) {
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
    newQ.dy = dy;
    newQ.complete = false;
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

  renderQuestions(context) {
    for (const key of Object.keys(this.questions)) {
      const q = this.questions[key];
      if (q.complete) {
        continue;
      }

      q.y += q.dy;
      context.fillText(q.text, q.x, q.y);
    }
  }
}