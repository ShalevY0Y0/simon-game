var buttonColours = ["red", "blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;


$(document).on("keypress", function(){
    if ($("h1").text() == "Press A Key to Start" || $("h1").text() == "Game Over, Press Any Key To Restart" ){
    nextSequence();
    }
})


$(".btn").on("click", function (event){
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
    
})

function nextSequence(){
    level ++;
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(300).fadeOut(300).fadeIn(300);
    playSound(randomChosenColour);
    $("h1").text("level " + level);
    
}


function playSound(color){
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}


function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => { $("#" + currentColour).removeClass("pressed");
        
    }, 100);


}

function checkAnswer(currentLevel){
    if ( gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        console.log()
        if (userClickedPattern.length == gamePattern.length) {
            console.log("Game Pattern: ", gamePattern);
            console.log("userClickedPattrern  :", userClickedPattern);
            console.log("success");
            setTimeout(() => {
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        } 
    }else {
        console.log("Failure");

        var audio = new Audio('sounds/wrong.mp3');
        audio.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key To Restart");
        startOver();
    }
    }

    function startOver(){
        level = 0;
        gamePattern = [];
        userClickedPattern = [];

    }




