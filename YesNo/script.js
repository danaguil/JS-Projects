document.addEventListener('DOMContentLoaded', function() {
  var body = document.body;
  var yesButton = document.getElementById('yesButton');
  var noButton = document.getElementById('noButton');
  var gifURL = "https://media.tenor.com/_iHH34fycP8AAAAM/love-heartbeat.gif";

  noButton.addEventListener('mouseenter', function(){
    body.style.background = 'linear-gradient(90deg, #333333 0%, #dd1818 100%)';
    moveButtonToRandomPosition(noButton);
  });
  
  function handleButtonClick(action) {
    if (action === 'yes') {
      body.style.backgroundImage = 'url("' + gifURL + '")';
      var h1 = document.querySelector('h1');
      h1.style.display = 'none';
      yesButton.style.display = 'none';
      noButton.style.display = 'none';
    } else if (action === 'no') {
      yesButton.style.position = 'static'; // Reset position of yesButton
      moveButtonToRandomPosition(noButton);
    }
  }

  function moveButtonToRandomPosition(button) {
    var bodyWidth = body.clientWidth;
    var bodyHeight = body.clientHeight;
    var buttonWidth = button.offsetWidth;
    var buttonHeight = button.offsetHeight;

    // Calculate random position
    var randomX = Math.floor(Math.random() * (bodyWidth - buttonWidth));
    var randomY = Math.floor(Math.random() * (bodyHeight - buttonHeight));

    // Move the button to the new position
    button.style.left = randomX + 'px';
    button.style.top = randomY + 'px';
    button.style.position = 'absolute'; // Set position to absolute
  }

  // Event listener for the "YES!!" button
  yesButton.addEventListener('click', function() {
    handleButtonClick('yes');
  });

  // Event listener for the "no:(" button
  noButton.addEventListener('click', function() {
    handleButtonClick('no');
  });
});
