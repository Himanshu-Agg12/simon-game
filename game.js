//variable declarations
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var flag = false;
var level = 0;

//keypress function
$(document).keypress(function() {
    if(!flag){
        var player = prompt("Enter Your Name");
        $("#playerName").text("Player Name: " + player);
        $("#level-title").text("Level " + level);
        nextSequence();
        flag=true;
    }
});

//click function
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    check(userClickedPattern.length-1);
});

//checking for pattern
function check(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        
        if(gamePattern.length === userClickedPattern.length){
            
            setTimeout(function() {
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
         $("#level-title").text("Game Over, Press Any Key to Restart");
        
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        
        startOver();
    }
}

//adding sequences
function nextSequence() {
    
    userClickedPattern = [];
    
    level++;
    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(250);
    //  fadeIn(100).fadeOut(100).fadeIn(100)  ;
    playSound(randomChosenColour);
}

//function for sound
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//function for animation
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

//restart game and reset all variables
function startOver(){
    level = 0;
    gamePattern = [];
    flag = false;
}