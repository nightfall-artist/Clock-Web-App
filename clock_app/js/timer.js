// Global

var workClicks = 25;
var workDisplay = document.getElementById("timer-display");
var count = 0;
var workSession;

// Add Time

var increaseWork = document.getElementById("addBtn");
increaseWork.addEventListener("click", function(){
	workClicks+= 1;
	workDisplay.innerHTML = workClicks;
}, false);

// Remove Time

var decreaseWork = document.getElementById("subBtn");
decreaseWork.addEventListener("click", function(){
	workClicks-= 1;
	workDisplay.innerHTML = workClicks;
	if(workClicks < 1){
		workClicks = 1;
		workDisplay.innerHTML = workClicks;
	} // end of if
});

// function start

function start() {
	count = workClicks * 60;
	//alert(count);
	workSession = setInterval(workCountDown,1000);
}// end of function

// function workCountDown

function workCountDown() {
	//alert("hello");
	var seconds = count;
	var hours = Math.floor(seconds/3600);
	//alert(hours);
	seconds-= hours*3600;
	//seconds = seconds - (hours*3600);
	//alert(seconds);
	var minutes = Math.floor(seconds/60);
	seconds-= minutes*60;
	document.getElementById("showtime").innerHTML = ('00' + hours).slice(-2) +":" + ('00' + minutes).slice(-2) + ":" + ('00' + seconds).slice(-2);
	count--;
	if(count < 0) {
		clearInterval(workSession);
		workSession = null;
		document.getElementById("showtime").innerHTML = "Time Up";
		alert('Time Up');
	}// end of if
}// end of function

// function pause

function pause() {
	clearInterval(workSession);
	workSession = null;
}// end of function

// function resume 

function resume() {
	workSession = setInterval(workCountDown,1000);
}// end of function

// function reset 

function reset() {
	if(workSession) {
		clearInterval(workSession);
		workSession = null;
	}
	document.getElementById("showtime").innerHTML = "00:00:00";
	document.getElementById("pause").disabled = false;
	document.getElementById("resume").disabled = false;	
}
// end of function