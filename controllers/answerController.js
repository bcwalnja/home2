class AnswerController {
  answers = [];

  constructor(operation, term1Min, term1Max, term2Min, term2Max) {
    this.operation = operation;
    this.term1Min = term1Min;
    this.term1Max = term1Max;
    this.term2Min = term2Min;
    this.term2Max = term2Max;
  }

  generateNewAnswers(canvas, correctAnswer) {
    log('generating new answers');
    let a1 = {};
    let a2 = {};
    let a3 = {};
    let a4 = {};

    switch (this.operation) {
      case "multiplication":
        this.multiplicationAnswers(a1, a2, a3, a4);
        break;
      case "division":
        this.divisionAnswers(a1, a2, a3, a4);
        break;
      case "addition":
        this.additionAnswers(a1, a2, a3, a4);
        break;
      default:
        this.subtractionAnswers(a1, a2, a3, a4, correctAnswer);
        break;
    }

    let fontSize = Math.floor(canvas.height / 20);
    a1.y = a2.y = a3.y = a4.y = canvas.height - fontSize - 10;
    a1.x = canvas.width * 0.1;
    a2.x = canvas.width * 0.3;
    a3.x = canvas.width * 0.5;
    a4.x = canvas.width * 0.7;

    this.answers = [a1, a2, a3, a4];

    if (!this.answers.some(x => x.text == correctAnswer)) {
      this.answers[rand(0, 3)].text = correctAnswer;
    }
  }

  removeAnswer(answer) {
    this.answers = this.answers.filter(x => x.text != answer.text);
  }

  renderAnswers(context) {
    verbose('renderAnswers');
    this.answers?.forEach(x => {
      context.fillText(x.text, x.x, x.y);
    });
  }
  
  multiplicationAnswers(a1, a2, a3, a4) {
    let lower = Math.max(this.term1Min, this.term2Min);
    let upper = Math.min(this.term1Max, this.term2Max);
    upper = upper - lower > 4 ? upper : lower + 6;

    a1.text = rand(lower, upper) * rand(lower, upper);
    do {
      a2.text = rand(lower, upper) * rand(lower, upper);
    } while (a1.text == a2.text);
    do {
      a3.text = rand(lower, upper) * rand(lower, upper);
    } while (a1.text == a3.text || a2.text == a3.text);
    do {
      a4.text = rand(lower, upper) * rand(lower, upper);
    } while (a1.text == a4.text || a2.text == a4.text || a3.text == a4.text);
  }

  divisionAnswers(a1, a2, a3, a4) {
    let upper = this.term1Max > 4 ? this.term1Max : 6;
    a1.text = rand(0, upper);
    do {
      a2.text = rand(0, upper);
    } while (a1.text == a2.text);
    do {
      a3.text = rand(0, upper);
    } while (a1.text == a3.text || a2.text == a3.text);
    do {
      a4.text = rand(0, upper);
    } while (a1.text == a4.text || a2.text == a4.text || a3.text == a4.text);
  }

  additionAnswers(a1, a2, a3, a4) {
    a1.text = rand(0, this.term1Max);
    do {
      a2.text = rand(0, this.term1Max);
    } while (a1.text == a2.text);
    do {
      a3.text = rand(0, this.term1Max);
    } while (a1.text == a3.text || a2.text == a3.text);
    do {
      a4.text = rand(0, this.term1Max);
    } while (a1.text == a4.text || a2.text == a4.text || a3.text == a4.text);
  }

  subtractionAnswers(a1, a2, a3, a4, correctAnswer) {
    let upper = correctAnswer > 4 ? correctAnswer : 6;
    a1.text = rand(0, upper);
    do {
      a2.text = rand(0, upper);
    } while (a1.text == a2.text);
    do {
      a3.text = rand(0, upper);
    } while (a1.text == a3.text || a2.text == a3.text);
    do {
      a4.text = rand(0, upper);
    } while (a1.text == a4.text || a2.text == a4.text || a3.text == a4.text);
  }

  //a complete list of all the possible answers up to 12 x 12:
  // list length is 42
  //This could probably save some computation time but I don't feel like integrating it right now
  answers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 18, 20, 21, 24, 25, 27, 28, 30, 32, 35, 36, 40, 42, 45, 48, 49, 54, 56, 63, 64, 72, 81, 100, 108, 121, 144]

}