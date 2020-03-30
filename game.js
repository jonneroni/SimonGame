var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;


$(document).keydown(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// when the user clicks a button, add its id (color) to userClickedPattern array
$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    // console.log(userClickedPattern);

    animatePress(userChosenColor);
    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {

    userClickedPattern = [];    // reset the userClickedPattern for a new level.
    level++
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4); // random number 0-3
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100); // animate the next button to be clicked

    playSound(randomChosenColor);
}

// function to play a sound according to color

function playSound(color) {
    var nextSound = new Audio("sounds/" + color + ".mp3");
    if (color == "wrong") {
        nextSound.volume = 0.7;
    } else {
        nextSound.volume = 0.2;
    }
    nextSound.play();
}

// function to animate a button press

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    // after 100ms remove the class "pressed"
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        // if the player has finished their sequence, call nextSequence after 1s
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }

    } else {
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}