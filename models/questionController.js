class QuestionController {
  questions = {};

  // constructor needs to know the operation and 
  // the factor parameters term 1 min and max and term 2 min and max
  constructor(operation, term1Min, term1Max, term2Min, term2Max) {
    this.operation = operation;
    this.term1Min = term1Min;
    this.term1Max = term1Max;
    this.term2Min = term2Min;
    this.term2Max = term2Max;
  }

  getNextId() {
    let highestNumberUsed = 0;
    for (const key in this.questions) {
      const question = this.questions[key];
      const numberUsed = parseInt(question.id);
      if (numberUsed > highestNumberUsed) {
        highestNumberUsed = numberUsed;
      }
    }
    return (highestNumberUsed + 1).toString();
  }

  generateNewQuestion({ x, y, dy }) {
    log('generating a new question');

    //TODO: give responsibility to the game controller
    // // the limit of q was 2 plus the number of missiles
    // if (q && q.length > 2 + (missiles?.length || 0)) {
    //   return;
    // }

    var q1 = {};
    q1.id = this.getNextId();
    switch (this.operation) {
      case 'multiplication':
        this.getMultiplicationQuestion(q1);
        break;
      case 'division':
        this.getDivisionQuestion(q1);
        break;
      case 'addition':
        this.getAdditionQuestion(q1);
        break;
      case 'subtraction':
        this.getSubtractionQuestion(q1);
        break;
      default:
        throw new Error('Invalid operation: ' + this.operation);
    }
    q1.x = x;
    q1.y = y;
    q1.dx = 0;
    q1.dy = dy;
    q1.complete = false;
    this.questions[q1.id] = q1;

    return q1;
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