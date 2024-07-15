log('loaded script.js');
const additionControls = document.getElementById('addition-control-container');
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');
const multiplicationControls = document.getElementById('multiplication-control-container');
const radioButtons = document.querySelectorAll('input[name="operation"]');
const allControlsContainer = document.getElementById('all-controls-container');

startButton.addEventListener('click', onStartClicked);
resetButton.addEventListener('click', onResetClicked);

for (const radioButton of radioButtons) {
  radioButton.addEventListener('change', onOperationChange);
}

function onOperationChange() {
  const selectedOperation = findSelectedOperation();
  log('selected operation:', selectedOperation);

  if (selectedOperation === 'addition' || selectedOperation === 'subtraction') {
    show(additionControls)
    hide(multiplicationControls)
  } else {
    hide(additionControls)
    show(multiplicationControls)
  }
}

function onStartClicked() {
  console.log('Start button was clicked!');
  hide(startButton)
  hide(allControlsContainer)
  show(resetButton)

  const operation = findSelectedOperation();
  log('selected operation:', operation);
}

function onResetClicked() {
  console.log('Reset button was clicked!');
  show(startButton)
  show(allControlsContainer)
  hide(resetButton)
}

function findSelectedOperation() {
  for (const operation of radioButtons) {
    if (operation.checked) {
      return operation.value;
    }
  }
}