
var userClickedPattern = [];

var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;

$(".start-button").click(function () {
    if (!started) {
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
    
});

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

    playSound(userChosenColour);
    animatePress(userChosenColour);
});


function nextSequence() {

    userClickedPattern = []
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}


function playSound(name) {
    var audio = new Audio ("sounds/"+name+".mp3");
    audio.play();
}


function animatePress(currentColor) {

    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
    
}


function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence,1000);
        }
        // console.log("Success");
    } else {
        playSound("wrong");

        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        $(".start-button").text("Restart")
        
        startOver();
    }
}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

