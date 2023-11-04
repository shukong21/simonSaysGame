var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStart = false;



$(document).keypress(function (e) { 
    if(gameStart==false){
        gameStart=true;
        $("#level-title").text("Level "+level);
        nextSequence();
    }
});


function nextSequence(){
    userClickedPattern = [];

    level++;

    $("#level-title").text("Level "+level);

    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);



    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    
}

$(document).on("click",".btn",function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    
})

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();

}

function animatePress(colour) {
    $("#"+colour).addClass("pressed");
    
    setTimeout(function () {
        $("#"+colour).removeClass("pressed");
    },100);
    
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){
            
            
            setTimeout(function (){
                nextSequence();
            },1000);
        
        } 
    }else{
        console.log("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        
        setTimeout(function (){
            $("body").removeClass("game-over");
        },200);
        restart();
    }
    
}

function restart(){
    
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    gameStart = false;
}
