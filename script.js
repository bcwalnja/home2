const startButton = document.getElementById('start-button');
startButton.addEventListener('click', onStartClicked);

function onStartClicked() {
  console.log('Start button was clicked!');
  startButton.disabled = true;
}