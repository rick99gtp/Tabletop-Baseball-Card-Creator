const btn = document.querySelector('.btnFile');
const inputBtn = document.querySelector('input');
const playerSelect = document.getElementById('playerSelect');
const results = document.querySelector('.results');

let stats_pa, stats_h, stats_1b, stats_2b, stats_3b, stats_hr, stats_bb, stats_k, stats_hbp;

let gameFile = "";
let playByPlayObj = [];

btn.addEventListener('click', () => {
    // get all events for player selected and display
    btn.style.display = "none";

    // get player_id based on player choice
    results.style.display = 'block';

    let player_name = document.querySelector('.results .player_name');

    player_name.textContent = playerSelect.options[playerSelect.selectedIndex].text;
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

    xmlhttp.open("GET", gameFile, true);
    xmlhttp.send();
}

function getPlayerNames() {
    let names = [];
    let players = [];

    // loop through file and get all player names
    for(let i=0, max = playByPlayObj.length; i < max; i++) {
        if(playByPlayObj[i].category === "start") {
            if(!names.includes(playByPlayObj[i].player_name)) {
                let playerName = playByPlayObj[i].player_name;
                let playerId = playByPlayObj[i].start_player_id;
    
                let thisPlayer = {playerName, playerId};

                names.push(playByPlayObj[i].player_name);
                players.push(thisPlayer);
            }
        }
    }

    players.sort(compare);

    for(let i=0, max = names.length; i < max; i++) {
        playerSelect.innerHTML += "<option value='" + players[i].playerId + "'>" + players[i].playerName + "</option>";
    }
}

function compare(a, b) {
    const nameA = a.playerName.toUpperCase();
    const nameB = b.playerName.toUpperCase();

    let comp = 0;
    if(nameA > nameB) {
        comp = 1;
    }
    else if (nameA < nameB) {
        comp = -1;
    }
    return comp;
}

function showResults() {
    let a = document.querySelector('.results .name');
    let name = playByPlayObj[1].play_result;
    a.innerHTML = name;
}