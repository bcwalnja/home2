log('loaded script.js');
additionControls = document.getElementById('addition-control-container');
startButton = document.getElementById('start-button');
resetButton = document.getElementById('reset-button');
multiplicationControls = document.getElementById('multiplication-control-container');
operationRadioButtons = document.querySelectorAll('input[name="operation"]');
modeRadioButtons = document.querySelectorAll('input[name="mode"]');
allInputs = document.querySelectorAll('input');
allControlsContainer = document.getElementById('all-controls-container');
canvas = document.getElementById('game-canvas');
explosionDuration = 2000;
game = null;

// by making all the methods lambda functions, 
// they don't have issues with 'this' keyword, 
// 'this' will always refer to the global object
const init = () => {
  startButton.onclick = onStartClicked;
  resetButton.onclick = onResetClicked;
  resetButton.disabled = true;

  for (const input of allInputs) {
    input.disabled = false;
  }

  window.addEventListener('resize', resizeCanvas);

  resizeCanvas();
}

const resizeCanvas = () => {
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = window.innerHeight * .95 - canvas.offsetTop;
}

const onStartClicked = () => {
  console.log('starting new game');
  startButton.disabled = true;
  resetButton.disabled = false;
  for (const input of allInputs) {
    input.disabled = true;
  }

  let operation = findSelectedOperation();
  log('selected operation:', operation);

  let mode = findSelectedMode();

  //get username and term values from controls
  let username = document.getElementById('name').value;
  let term1min = parseInt(document.getElementById('term-1-min').value);
  let term1max = parseInt(document.getElementById('term-1-max').value);
  let term2min = parseInt(document.getElementById('term-2-min').value);
  let term2max = parseInt(document.getElementById('term-2-max').value);

  game = new Game(canvas, username, operation, term1min, term1max, term2min, term2max, mode);
  game.startGame();
  game.timeExpired = resetGame;
  onkeydown = game.onkeydown;
}

const resetGame = () => {
  console.log('resetting game');
  if (game && !game.disposing) {
    game.dispose();
  }
  startButton.disabled = false;
  resetButton.disabled = true;
  for (const input of allInputs) {
    input.disabled = false;
  }
  onkeydown = null;
  game = null;
}

const onResetClicked = resetGame;

const findSelectedOperation = () => {
  for (const operation of operationRadioButtons) {
    if (operation.checked) {
      return operation.value;
    }
  }
}

const findSelectedMode = () => {
  for (const mode of modeRadioButtons) {
    if (mode.checked) {
      return mode.value;
    }
  }
}

init();