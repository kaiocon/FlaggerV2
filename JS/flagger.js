//Variable Declarations
var timeLeft = 30;
var flags = ["SPAIN", "CUBA", "ITALY"];
var currentFlag;
var scrambledFlag;
var currentScore = 0;
var correctCount = 0;
hsArray =[0, 0, 0, 0, 0];

//TO DO
//ADD IN SCORE SAVING
//ADD IN SCOREBOARD
//FIX MUSIC FOR MOBILE
//Add in some more flags, fix slot single digit error if it exists



$(document).ready(function(){
	
	document.getElementById("BG").play();
    $("#wrapper").fadeIn("slow");
	
    $("#start").click(function(){
        $("#content").fadeOut("slow", function(){
		$("#game").fadeIn("slow");
     });
		
		newFlag();
		shuffle();
		localStorage.setItem("highScore", hsArray);
		outputMarkup();
		startTimer();
    });
	
	$("#score").click(function(){
		$("#mute").fadeOut("slow");
        $("#content").fadeOut("slow", function(){
		$("#scoreBoard").fadeIn("slow");
		});
	});
	
	$("#menu").click(function(){
        $("#scoreBoard").fadeOut("slow", function(){
			$("#mute").fadeIn("slow");
			$("#content").fadeIn("slow");
		});
	});
	$("#menu2").click(function(){
        $("#gameOver").fadeOut("slow", function(){
			$("#mute").fadeIn("slow");
			$("#content").fadeIn("slow");
		});
	});
		
	$("#mute").click(function(){
		var check = $("#mute").attr("src");
		if(check == "http://upload.wikimedia.org/wikipedia/commons/2/21/Speaker_Icon.svg"){
			var backgroundMusic = document.getElementById("BG");
			$("#mute").attr("src", "http://upload.wikimedia.org/wikipedia/commons/3/3f/Mute_Icon.svg");
			backgroundMusic.muted = true;
		}
		else{
			var backgroundMusic = document.getElementById("BG");
			$("#mute").attr("src", "http://upload.wikimedia.org/wikipedia/commons/2/21/Speaker_Icon.svg");
			backgroundMusic.muted = false;
		}
	});
	
	

});

function startTimer() {
	var timerText = document.getElementById("timer");
	timeLeft = 30;
	
	var gameTimer = setInterval(end, 1000)
	function end(){
		timeLeft--;
		timerText.innerHTML = timeLeft;
		
		if(timeLeft == 0){
        clearInterval(gameTimer);
		endGame();}
	}
}

function newFlag() {
	
	var flagOutput = document.getElementById("globe");
	rand = Math.floor(Math.random() * flags.length);
	currentFlag = flags[rand];
	//flags.splice(rand, 1);
	flagOutput.innerHTML = "<img class='flag' src='flags/" + currentFlag + ".svg'>";
}
function endGame() {
	$("#mute").fadeOut("slow");
	$("#game").fadeOut("slow", function(){
		$("#gameOver").fadeIn("slow");
	});
	
	var results = document.getElementById("results");
	results.innerHTML = "GAME OVER!<br> SCORE: " + currentScore + "<br>";
	saveScore();

	
}

//Fisher–Yates shuffle
function shuffle() {
	
	array = currentFlag.split("");
    var i = array.length, temp, x;

    while (i) {
        x = Math.floor(Math.random() * i--);
        temp = array[i];
        array[i] = array[x];
        array[x] = temp;
    }
    scrambledFlag = array;
}

function outputMarkup() {
	//Sets variables, clears previous games if any.
	var slots = document.getElementById("slots");
	var drags = document.getElementById("drags");
	slots.innerHTML = "";
	drags.innerHTML = ""; 
	
	var a = currentFlag.length;
	for ( var i=0; i<a; i++ ) {
		slots.innerHTML = slots.innerHTML + "<div class='slot' id='slot" + i + "'>&nbsp;</div>"
		$(".slot").droppable( {
        accept: "#drags div",
        drop: checkAnswer });
    }
	  
	for ( var i=0; i<a; i++ ) {
		drags.innerHTML = drags.innerHTML + "<div class='drag' id='drag" + i + "'>" + scrambledFlag[i]+ "</div>"
		$(".drag").draggable({
		revert: true});
	}
}

function checkAnswer(event, ui) {
	slot = $(this).attr("id")
	drag = ui.draggable.attr("id")
	slot = slot[4];
	drag = drag[4];
	if (currentFlag[slot] == scrambledFlag[drag]) {
			$(this).droppable("disable");
			ui.draggable.draggable("disable");
			ui.draggable.position({
			of: $(this),
			my: "left top",
			at: "left top"});
			ui.draggable.draggable("option", "revert", false);
			correctCount++;
			
	}
	if (correctCount == currentFlag.length){
			correctCount = 0;
			document.getElementById("scoreSFX").play();
			currentScore++;
			nextFlag();
		
	}
}

function nextFlag() {
		newFlag();
		shuffle();
		outputMarkup();
	
}
	
function saveScore(){//Saves current score in highscores if highenough
	
	
	if (localStorage.getItem("highScore") != null){
		hsArray = localStorage.getItem("highScore");
	}
	
	var hs = false;
	for (var i=0; i<hsArray.length; i++){
		if(currentScore > hsArray[i] & hs == false){
			hsArray[i] = currentScore;
			hs = true;
			localStorage.setItem("highScore", hsArray);
		}
	
    }
	

}