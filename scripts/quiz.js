function Question(ask, options, answerIndex) {
    this.ask = ask;
    this.options = options;
    this.answerIndex = answerIndex;
};

var questionsArray = [];
var currentQuestion = Question("", [], 0);
var timerInterval;
var secondsRemaining = 90;
var runningScore = 0;

let askElement = document.getElementById("ask");
let optionsElement = document.getElementById("options");
let correctWrongElement = document.getElementById("correct-wrong");
let runningScoreElement = document.getElementById("running-score");
let timerElement = document.getElementById("timer");
optionsElement.addEventListener("click", answeredQuestion);

function startQuiz(){
    var q1 = new Question("Commonly used data types DO NOT include ___:", ["strings", "booleans", "alerts", "numbers"], 2);
    var q2 = new Question("The condition in an if/else statement is enclosed within ___:", ["quotes", "curly brackets", "paranthesis", "square brackets"], 2);
    var q3 = new Question("Arrays in Javascript can be used to store ___:", ["numbers and strings", "other arrays", "booleans", "all of the above"], 3);
    var q4 = new Question("String values must be enclosed within ___ when being assigned to variables.", ["commas", "curly brackets", "quotes", "paranthesis"], 2);
    var q5 = new Question("A very useful tool used during development and debugging for printing content to the debugger is ___:", ["JavaScript", "Terminal/Bash", "for loops", "console.log"], 3);

    questionsArray.push(q1);
    questionsArray.push(q2);
    questionsArray.push(q3);
    questionsArray.push(q4);
    questionsArray.push(q5);
};

function pickQuestion(){
    if (questionsArray.length > 0){
        var qPicked = Math.floor(Math.random() * questionsArray.length);
        currentQuestion = questionsArray.splice(qPicked, 1)[0];
        askQuestion(currentQuestion);
    }else{
        alert("No more questions");
        endQuiz();
    }
};
function askQuestion(question){
    askElement.textContent = question.ask;

    optionsElement.innerHTML = "";
    for (let i = 0; i < question.options.length; i++){
        let rowEl = document.createElement("div");
        rowEl.className = "row m-2";
        let optionEl = document.createElement("div");
        optionEl.className = "col-6 mx-auto text-left btn btn-primary text-white";
        optionEl.setAttribute("data-option", i);
        optionEl.textContent = i+1 + ". " + question.options[i];

        rowEl.appendChild(optionEl);
        optionsElement.appendChild(rowEl);
    }

    runningScoreElement.textContent = "Score:" + runningScore;
};

function answeredQuestion(event){
    let alertEl = document.createElement("div");
    alertEl.setAttribute("role", "alert");
    alertEl.id = "alert-at-"+secondsRemaining;

    if (parseInt(event.target.getAttribute("data-option")) === currentQuestion.answerIndex){
        alertEl.className = "mx-auto alert alert-success";
        alertEl.textContent = "Correct";
        runningScore+= 1;
    }else{
        alertEl.className = "mx-auto alert alert-danger";
        alertEl.textContent = "Wrong!";
        secondsRemaining-= 10;
    }
    correctWrongElement.appendChild(alertEl);

    setTimeout(function(){
        $("#"+alertEl.id).alert("close");
    },3000);
    pickQuestion();
};

function reduceTimer(){
    secondsRemaining--;
    if (secondsRemaining <= 0){
        endQuiz();
    }
    timerElement.textContent = "Time:"+secondsRemaining + " sec";
};

function beginQuiz(){
    startQuiz();
    pickQuestion();
    timerInterval = setInterval(reduceTimer, 1000);
};

function endQuiz(){
    console.log("ending quiz");
    clearInterval(timerInterval);
    if (secondsRemaining > 0){
        runningScore+= secondsRemaining;
    }
    localStorage.setItem("score", runningScore);
    window.location.replace("./score.html");
}

beginQuiz();