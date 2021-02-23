function Score(player, score){
    this.player = player;
    this.score = score;
};

let scoreElement = document.getElementById("score");
scoreElement.textContent = localStorage.getItem("score");
let scoreFormElement = document.getElementById("score-form");

scoreFormElement.addEventListener("submit", addScore);

function addScore(event){
    event.preventDefault();
    let player = document.getElementById("initials").value;
    var scoreboard = localStorage.getItem("scoreboard");
    if(scoreboard === null){
        scoreboard = [];
    }else{
        scoreboard = JSON.parse(scoreboard);
    }
    scoreboard.push(new Score(player, scoreElement.textContent));
    localStorage.setItem("scoreboard", JSON.stringify(scoreboard));
    window.location.replace("./scoreboard.html");
};