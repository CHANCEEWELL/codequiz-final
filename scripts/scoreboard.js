function Score(player, score) {
    this.player = player;
    this.score = score;
};

let clearScoreElement = document.getElementById("clear-scores");
let scoresElement = document.getElementById("scores");

clearScoreElement.addEventListener("click", clearScores);

function populateScoreboard(scores){
    if (scores === null){
        return;
    }

    sortScores(scores);
    scoresElement.innerHTML = "";
    for (let i = 0; i < scores.length; i++){
        let rowEl = document.createElement("div");
        rowEl.className = "row mb-2 record";

        let positionEl = document.createElement("div");
        positionEl.className = "ml-auto mr-2 text-right text-secondary position";
        positionEl.textContent = i + 1;

        let playerEl = document.createElement("div");
        playerEl.className = "mx-auto mr-2 text-center text-secondary player";
        playerEl.textContent = scores[i].player

        let scoreEl = document.createElement("div");
        scoreEl.className = "mr-auto ml text-right text-secondary score";
        scoreEl.textContent = scores[i].score;

        rowEl.appendChild(positionEl);
        rowEl.appendChild(playerEl);
        rowEl.appendChild(scoreEl);
        scoresElement.appendChild(rowEl);
    }
};

function clearScores(){
    localStorage.removeItem("scoreboard");

    scoresElement.innerHTML = "";
};

function sortScores(scores){
    scores.sort(compareScore);
};

function compareScore(a, b){
    if (parseInt(a.score) > parseInt(b.score)){
        return -1;
    }else if (parseInt(a.score) < parseInt(b.score)){
        return 1;
    }else{
        return 0;
    }
};

populateScoreboard(JSON.parse(localStorage.getItem("scoreboard")));