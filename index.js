var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

var buttonColours = ["red", "blue", "green", "yellow"];


function nextSequence(){
  userClickedPattern = [];
  level++;
  $("h1").text("Level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);
  $("#"+ randomChosenColour).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200)
  playSound(randomChosenColour);


}


function playSound(name){
  var audio = new Audio("sounds/" +name+ ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed")
  setTimeout(function(){
  $("#"+currentColour).removeClass("pressed");
},100);
}

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});


$(document).keydown(function(){
  if(!started)
      {
        $("h1").text("Level "+level);
        nextSequence()
        started =true;
      }
});

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("Right");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(nextSequence(),1000);
    }
  }
  else{

    console.log("wrong");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $("body").addClass("game-over");

    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);

      startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
  userClickedPattern = [];

  $("h1").text("Game Over! Press any key to start a new game!");
}
