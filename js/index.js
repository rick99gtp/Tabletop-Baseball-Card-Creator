const btn = document.querySelector('.btnFile');
const inputBtn = document.querySelector('input');
const playerSelect = document.getElementById('playerSelect');
const results = document.querySelector('.results');

let gameFile = "";
let playByPlayObj = [];

btn.addEventListener('click', () => {
    // get all events for player selected and display
    btn.style.display = "none";

    // get player_id based on player choice
    results.style.display = 'block';

    let player_name = document.querySelector('.results .player_name');
    player_name.textContent = playerSelect.value;
});

function inputBtnFunction() {
    // get list of all players in file
    let str = inputBtn.value;
    let newStr = str.replace("C:\\fakepath\\","");
    gameFile = "/csv files/" + newStr;

    // show dropdown box
    playerSelect.style.display = 'block';

    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            playByPlayObj = JSON.parse(this.responseText);

            getPlayerNames();

            btn.style.display = 'block';
        }
    };

    xmlhttp.open("GET", gameFile, true);  // "/csv files/2019_ANA.json"
    xmlhttp.send();
}

function getPlayerNames() {
    let names = [];

    // loop through file and get all player names
    for(let i=0, max = playByPlayObj.length; i < max; i++) {
        if(playByPlayObj[i].category === "start") {
            names.push(playByPlayObj[i].player_name);
        }
    }

    names = [...new Set(names)].sort();

    for(let i=0, max = names.length; i < max; i++) {
        playerSelect.innerHTML += "<option value='" + names[i] + "'>" + names[i] + "</option>";
        console.log(names[i]);
    }
}

function showResults() {
    let a = document.querySelector('.results .name');
    let name = playByPlayObj[1].play_result;
    a.innerHTML = name;
}