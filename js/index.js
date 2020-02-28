const btn = document.querySelector('.btnFile');
const inputBtn = document.querySelector('input');
const playerSelect = document.getElementById('playerSelect');
const results = document.querySelector('.results');

let stats = {
    pa: 0,
    ab: 0,
    h: 0,
    b1_if: 0,
    b1_rf: 0,
    b1_cf: 0,
    b1_lf: 0,
    b2_rf: 0,
    b2_cf: 0,
    b2_lf: 0,
    b3_rf: 0,
    b3_cf: 0,
    b3_lf: 0,
    hr_rf: 0,
    hr_cf: 0,
    hr_lf: 0,
    bb: 0,
    k: 0,
    hbp: 0
}

let gameFile = "";
let playByPlayObj = [];
let searchForPlayerByID = 0;

btn.addEventListener('click', () => {
    // get all events for player selected and display
    btn.style.display = "none";

    // get player_id based on player choice
    results.style.display = 'block';

    let player_name = document.querySelector('.results .player_name');

    player_name.textContent = playerSelect.options[playerSelect.selectedIndex].text;

    // loop through play-by-play file looking for selected players events
    for(let i = 0, max = playByPlayObj.length; i < max; i++) {
        if(playByPlayObj[i].category === "play") {
            if(playByPlayObj[i].play_player_id === searchForPlayerByID) {
                console.log(playByPlayObj[i].play_result);
                if(playByPlayObj[i].play_result !== "NP" || playByPlayObj[i].play_result.substring(0,2) !== "SB" || playByPlayObj[i].play_result.substring(0,2) !== "WP") {
                    // add PA
                    stats.pa++;

                    if(playByPlayObj[i].play_result.charAt(0) === "K") {
                        stats.k++;
                        stats.ab++;
                    }
                    else if(playByPlayObj[i].play_result.charAt(0) === "W") {
                        stats.bb++;
                    }
                    else if(playByPlayObj[i].play_result.substring(0,2) === "S9") {
                        stats.b1_rf++;
                        stats.h++;
                        stats.ab++;
                    }
                    else if(playByPlayObj[i].play_result.substring(0,2) === "S8") {
                        stats.b1_cf++;
                        stats.h++;
                        stats.ab++;
                    }
                    else if(playByPlayObj[i].play_result.substring(0,2) === "S7") {
                        stats.b1_lf++;
                        stats.h++;
                        stats.ab++;
                    }
                    else if(playByPlayObj[i].play_result.substring(0,2) === "S1" || playByPlayObj[i].play_result.substring(0,2) === "S2" || playByPlayObj[i].play_result.substring(0,2) === "S3" || playByPlayObj[i].play_result.substring(0,2) === "S4" || playByPlayObj[i].play_result.substring(0,2) === "S5" || playByPlayObj[i].play_result.substring(0,2) === "S6") {
                        stats.b1_if++;
                        stats.h++;
                        stats.ab++;
                    }
                    else if(playByPlayObj[i].play_result.substring(0,2) === "D9") {
                        stats.b2_rf++;
                        stats.h++;
                        stats.ab++;
                    }
                    else if(playByPlayObj[i].play_result.substring(0,2) === "D8" || playByPlayObj[i].play_result.substring(0,3) === "DGR") {
                        stats.b2_cf++;
                        stats.h++;
                        stats.ab++;
                    }
                    else if(playByPlayObj[i].play_result.substring(0,2) === "D7") {
                        stats.b2_lf++;
                        stats.h++;
                        stats.ab++;
                    }
                    else if(playByPlayObj[i].play_result.substring(0,2) === "T9") {
                        stats.b3_rf++;
                        stats.h++;
                        stats.ab++;
                    }
                    else if(playByPlayObj[i].play_result.substring(0,2) === "T8") {
                        stats.b3_cf++;
                        stats.h++;
                        stats.ab++;
                    }
                    else if(playByPlayObj[i].play_result.substring(0,2) === "T7") {
                        stats.b3_lf++;
                        stats.h++;
                        stats.ab++;
                    }
                    else if(playByPlayObj[i].play_result.substring(0,4) === "HR/9") {
                        stats.hr_rf++;
                        stats.h++;
                        stats.ab++;
                    }
                    else if(playByPlayObj[i].play_result.substring(0,4) === "HR/8") {
                        stats.hr_cf++;
                        stats.h++;
                        stats.ab++;
                    }
                    else if(playByPlayObj[i].play_result.substring(0,4) === "HR/7") {
                        stats.hr_lf++;
                        stats.h++;
                        stats.ab++;
                    }
                    else if(playByPlayObj[i].play_result.substring(0,2) === "HP") {
                        stats.hbp++;
                    }
                }
            }
        }
    }

    // store results in variables

    // display on screen
    console.log("PA: " + stats.pa);
    console.log("AB: " + stats.ab);
    console.log("H: " + stats.h);
    console.log("1B-IF: " + stats.b1_if);
    console.log("1B-LF: " + stats.b1_lf);
    console.log("1B-CF: " + stats.b1_cf);
    console.log("1B-RF: " + stats.b1_rf);
    console.log("2B-LF: " + stats.b2_lf);
    console.log("2B-CF: " + stats.b2_cf);
    console.log("2B-RF: " + stats.b2_rf);
    console.log("3B-LF: " + stats.b3_lf);
    console.log("3B-CF: " + stats.b3_cf);
    console.log("3B-RF: " + stats.b3_rf);
    console.log("HR-LF: " + stats.hr_lf);
    console.log("HR-CF: " + stats.hr_cf);
    console.log("HR-RF: " + stats.hr_rf);
    console.log("HBP: " + stats.hbp);
    console.log("BB: " + stats.bb);
    console.log("K: " + stats.k);
    
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

function changeSelectedPlayer() {
    searchForPlayerByID = playerSelect.options[playerSelect.selectedIndex].value;
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

    // set currently selected player
    searchForPlayerById = playerSelect.options[playerSelect.selectedIndex].value;
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