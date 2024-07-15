log('loaded game.js');
class Game {
  //trying to think what pieces I need for this math shooter game...
  // questions, answers, missiles, score, time, math operation, do I also want username?
  // the constructor probably only needs username and operation
  constructor(username, operation) {
    this.username = username;
    this.operation = operation;
    this.questions = [];
    this.answers = [];
    this.missiles = [];
    this.score = 0;
    this.time = 0;
  }

  username;
  operation;
  questions;
  answers;
  missiles;
  score;
  time;


}