var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var started = false;

$(document).keypress(function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

$(document).click(function(event) {
  if (!event.target.classList.contains('btn')) 
  {
    if (!started) 
    {
      nextSequence();
      started = true;
    }
  }
});

$(".btn").on("click", function () {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence() 
{
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4); // 0 to 3
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100); // for animation
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) 
{
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) 
    {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length)
      {
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } 
    else
    {
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();

      $("body").addClass("game-over");
      setTimeout(function()
      {
        $("body").removeClass("game-over");
      },200);

      $("h1").text("Game Over, Press Any Key to Restart");

      console.log($("h1").text());
      startOver();
    }
}

function startOver()
{
  gamePattern = [];
  level = 0;
  started = false;
}