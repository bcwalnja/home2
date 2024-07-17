

class QuestionController {
  questions = [];

  // constructor needs to know the operation and 
  // the factor parameters term 1 min and max and term 2 min and max
  constructor(operation, term1Min, term1Max, term2Min, term2Max) {
    this.operation = operation;
    this.term1Min = term1Min;
    this.term1Max = term1Max;
    this.term2Min = term2Min;
    this.term2Max = term2Max;
  }


  generateNewQuestion({x, y, dy}) {
    log('generating a new question');

    //TODO: give responsibility to the game controller
    // // the limit of q was 2 plus the number of missiles
    // if (q && q.length > 2 + (missiles?.length || 0)) {
    //   return;
    // }

    var q1 = {};
    q1.term1 = rand(term1Min, term1Max);
    q1.term2 = rand(term2Min, term2Max);
    q1.answer = q1.term1 * q1.term2;
    q1.text = q1.term1 + ' * ' + q1.term2 + ' = ?';
    q1.x = x;
    q1.y = y;
    q1.dx = 0;
    q1.dy = dy;
    q1.complete = false;
    questions.push(q1);

    return q1;
  }

  renderQuestions() {
    for (const q of questions) {
      if (q.complete) {
        continue;
      }

      q.y += 2;
      context.fillText(q.text, q.x, q.y);
    }
  }
}