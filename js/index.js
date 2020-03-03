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
    b2_dgr: 0,
    b3_rf: 0,
    b3_cf: 0,
    b3_lf: 0,
    hr_rf: 0,
    hr_cf: 0,
    hr_lf: 0,
    bb: 0,
    k: 0,
    hbp: 0,
    g1: 0,
    g2: 0,
    g3: 0,
    g4: 0,
    g5: 0,
    g6: 0,
    f7: 0,
    f8: 0,
    f9: 0,
    pop: 0,
    fo: 0,
    lo: 0,
    gdp: 0
}

let singles = [];
let doubles = [];
let single_types = ["LF", "CF", "RF", "IF"];
let range_values = [1,2,3,4,5,6,5,4,3,2,1];
let singles_results = ["", "", "", "", "", "", "", "", "", "", ""];
let doubles_results = ['', '', '', '', '', '', '', '', '', '', ''];

let base_results_available = [[1,2,3,4,5,6,5,4,3,2,1],[1,2,3,4,5,6,5,4,3,2,1],[1,2,3,4,5,6,5,4,3,2,1]];

let gameFile = "";
let playByPlayObj = [];
let searchForPlayerByID = 0;
let count = 0;

btn.addEventListener('click', () => {
    // create new array
    let new_results = new Array(base_results_available);

    // get all events for player selected and display

    // get player_id based on player choice
    results.style.display = 'block';

    let player_name = document.querySelector('.results .player_name');

    player_name.textContent = playerSelect.options[playerSelect.selectedIndex].text;

    // loop through play-by-play file looking for selected players events
    for(let i = 0, max = playByPlayObj.length; i < max; i++) {
        if(playByPlayObj[i].category === "play") {
            if(playByPlayObj[i].play_player_id === searchForPlayerByID) {
                if(playByPlayObj[i].play_result !== "NP" && playByPlayObj[i].play_result.substring(0,2) !== "SB" && playByPlayObj[i].play_result.substring(0,2) !== "CS" && playByPlayObj[i].play_result.substring(0,2) !== "WP" && playByPlayObj[i].play_result.substring(0,2) !== "BK" &&  playByPlayObj[i].play_result.substring(0,2) !== "PO" &&  playByPlayObj[i].play_result.substring(0,2) !== "DI" &&  playByPlayObj[i].play_result.substring(0,4) !== "C/E2" &&  playByPlayObj[i].play_result.substring(0,2) !== "PB" && playByPlayObj[i].play_result.substring(0,2) !== "OA" && playByPlayObj[i].play_result.substring(0,4) !== "POCS" && playByPlayObj[i].play_result.substring(0,4) !== "FLE" && playByPlayObj[i].play_result.substring(0,4) !== "C/E3") {
                    // add PA
                    stats.pa++;
                    count++;
                    console.log(count + ": " + playByPlayObj[i].play_result);

                    if(playByPlayObj[i].play_result.charAt(0) === "K") {
                        stats.k++;
                        stats.ab++;
                    }
                    else if(playByPlayObj[i].play_result.charAt(0) === "W" || playByPlayObj[i].play_result.substring(0,2) === "IW") {
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
                    else if(playByPlayObj[i].play_result.substring(0,2) === "D8" || playByPlayObj[i].play_result.substring(0,3) === "D/L") {
                        stats.b2_cf++;
                        stats.h++;
                        stats.ab++;
                    }
                    else if(playByPlayObj[i].play_result.substring(0,2) === "D7" || playByPlayObj[i].play_result.substring(0,2) === "D6" || playByPlayObj[i].play_result.substring(0,2) === "D5") {
                        stats.b2_lf++;
                        stats.h++;
                        stats.ab++;
                    }
                    else if(playByPlayObj[i].play_result.substring(0,3) === "DGR") {
                        stats.b2_dgr++;
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
                    else if(playByPlayObj[i].play_result.substring(0,4) === "HR/8" || playByPlayObj[i].play_result.substring(0,5) === "HR8/8") {
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
                    else if(playByPlayObj[i].play_result.substring(0,3) === "1/G" || playByPlayObj[i].play_result.substring(0,2) === "12" || playByPlayObj[i].play_result.substring(0,2) === "13" || playByPlayObj[i].play_result.substring(0,2) === "E1" || playByPlayObj[i].play_result.substring(0,5) === "FC1/G" || playByPlayObj[i].play_result.substring(0,2) === "14" || playByPlayObj[i].play_result.substring(0,2) === "16" || playByPlayObj[i].play_result.substring(0,4) === "1(B)") {
                        stats.g1++;
                    }
                    else if(playByPlayObj[i].play_result.substring(0,3) === "2/G" || playByPlayObj[i].play_result.substring(0,2) === "23" || playByPlayObj[i].play_result.substring(0,2) === "E2" || playByPlayObj[i].play_result.substring(0,5) === "FC2/G") {
                        stats.g2++;
                    }
                    else if(playByPlayObj[i].play_result.substring(0,3) === "3/G" || playByPlayObj[i].play_result.substring(0,2) === "E3" || playByPlayObj[i].play_result.substring(0,3) === "FC3" || playByPlayObj[i].play_result.substring(0,2) === "31"  || playByPlayObj[i].play_result.substring(0,2) === "36" || playByPlayObj[i].play_result.substring(0,2) === "32" || playByPlayObj[i].play_result.substring(0,4) === "3(B)") {
                        stats.g3++;
                    }
                    else if(playByPlayObj[i].play_result.substring(0,3) === "4/G" || playByPlayObj[i].play_result.substring(0,2) === "43" || playByPlayObj[i].play_result.substring(0,2) === "45" || playByPlayObj[i].play_result.substring(0,2) === "E4" || playByPlayObj[i].play_result.substring(0,3) === "FC4" || playByPlayObj[i].play_result.substring(0,4) === "4(1)" || playByPlayObj[i].play_result.substring(0,2) === "46" || playByPlayObj[i].play_result.substring(0,2) === "41" || playByPlayObj[i].play_result.substring(0,4) === "4(B)") {
                        stats.g4++;
                    }
                    else if(playByPlayObj[i].play_result.substring(0,3) === "5/G" || playByPlayObj[i].play_result.substring(0,2) === "53" || playByPlayObj[i].play_result.substring(0,2) === "54" || playByPlayObj[i].play_result.substring(0,2) === "E5" || playByPlayObj[i].play_result.substring(0,3) === "FC5" || playByPlayObj[i].play_result.substring(0,4) === "5(2)" || playByPlayObj[i].play_result.substring(0,2) === "56" || playByPlayObj[i].play_result.substring(0,2) === "52" || playByPlayObj[i].play_result.substring(0,4) === "5(B)") {
                        stats.g5++;
                    }
                    else if(playByPlayObj[i].play_result.substring(0,3) === "6/G" || playByPlayObj[i].play_result.substring(0,2) === "63" || playByPlayObj[i].play_result.substring(0,2) === "64" || playByPlayObj[i].play_result.substring(0,2) === "65" || playByPlayObj[i].play_result.substring(0,2) === "E6" || playByPlayObj[i].play_result.substring(0,3) === "FC6" || playByPlayObj[i].play_result.substring(0,4) === "6(1)" || playByPlayObj[i].play_result.substring(0,4) === "6(B)") {
                        stats.g6++;
                    }
                    else if(playByPlayObj[i].play_result.substring(0,3) === "7/F" || playByPlayObj[i].play_result.substring(0,3) === "7/L" || playByPlayObj[i].play_result.substring(0,2) === "E7" || playByPlayObj[i].play_result.substring(0,4) === "7(B)") {
                        stats.f7++;
                    }
                    else if(playByPlayObj[i].play_result.substring(0,3) === "8/F" || playByPlayObj[i].play_result.substring(0,3) === "8/L" || playByPlayObj[i].play_result.substring(0,2) === "E8" || playByPlayObj[i].play_result.substring(0,4) === "8(B)") {
                        stats.f8++;
                    }
                    else if(playByPlayObj[i].play_result.substring(0,3) === "9/F" || playByPlayObj[i].play_result.substring(0,3) === "9/L" || playByPlayObj[i].play_result.substring(0,2) === "E9" || playByPlayObj[i].play_result.substring(0,4) === "9(B)") {
                        stats.f9++;
                    }
                    else if(playByPlayObj[i].play_result.substring(0,3) === "1/P" || playByPlayObj[i].play_result.substring(0,3) === "2/P" || playByPlayObj[i].play_result.substring(0,3) === "3/P" || playByPlayObj[i].play_result.substring(0,3) === "4/P" || playByPlayObj[i].play_result.substring(0,3) === "5/P" || playByPlayObj[i].play_result.substring(0,3) === "6/P") {
                        stats.pop++;
                    }
                    else if(playByPlayObj[i].play_result.substring(0,3) === "1/L") {
                        stats.lo++;
                    }
                    else if(playByPlayObj[i].play_result.substring(0,3) === "3/L") {
                        stats.lo++;
                    }
                    else if(playByPlayObj[i].play_result.substring(0,3) === "4/L") {
                        stats.lo++;
                    }
                    else if(playByPlayObj[i].play_result.substring(0,3) === "5/L") {
                        stats.lo++;
                    }
                    else if(playByPlayObj[i].play_result.substring(0,3) === "6/L") {
                        stats.lo++;
                    }
                }
            }
        }
    }

    // store results in variables
    // singles
    let s_total = stats.b1_if + stats.b1_lf + stats.b1_cf + stats.b1_rf;
    let s_rf = Math.round((stats.b1_rf / s_total) * 36);
    let s_lf = Math.round((stats.b1_lf / s_total) * 36);
    let s_cf = Math.round((stats.b1_cf / s_total) * 36);
    let s_if = 36 - s_rf - s_lf - s_cf;

    // doubles
    let d_total = stats.b2_dgr + stats.b2_lf + stats.b2_cf + stats.b2_rf;
    let d_rf = Math.round((stats.b2_rf / d_total) * 36);
    let d_lf = Math.round((stats.b2_lf / d_total) * 36);
    let d_cf = Math.round((stats.b2_cf / d_total) * 36);
    let d_dgr = 36 - d_rf - d_lf - d_cf;

    singles = [s_lf, s_cf, s_rf, s_if];
    doubles = [d_lf, d_cf, d_rf, d_dgr];

    let new_values = [...range_values];

    // create singles results
    for(let i = 0; i < 4; i++) {
        do {
            if(new_values[5] > 0 && new_values[5] <= singles[i]) {
                singles_results[5] = single_types[i];
                new_values[5] = 0;
                singles[i] -= 6;
            }
            else if(new_values[4] > 0 && new_values[4] <= singles[i]) {
                singles_results[4] = single_types[i];
                new_values[4] = 0;
                singles[i] -= 5;
            }
            else if(new_values[6] > 0 && new_values[6] <= singles[i]) {
                singles_results[6] = single_types[i];
                new_values[6] = 0;
                singles[i] -= 5;
            }
            else if(new_values[3] > 0 && new_values[3] <= singles[i]) {
                singles_results[3] = single_types[i];
                new_values[3] = 0;
                singles[i] -= 4;
            }
            else if(new_values[7] > 0 && new_values[7] <= singles[i]) {
                singles_results[7] = single_types[i];
                new_values[7] = 0;
                singles[i] -= 4;
            }
            else if(new_values[2] > 0 && new_values[2] <= singles[i]) {
                singles_results[2] = single_types[i];
                new_values[2] = 0;
                singles[i] -= 3;
            }
            else if(new_values[8] > 0 && new_values[8] <= singles[i]) {
                singles_results[8] = single_types[i];
                new_values[8] = 0;
                singles[i] -= 3;
            }
            else if(new_values[1] > 0 && new_values[1] <= singles[i]) {
                singles_results[1] = single_types[i];
                new_values[1] = 0;
                singles[i] -= 2;
            }
            else if(new_values[9] > 0 && new_values[9] <= singles[i]) {
                singles_results[9] = single_types[i];
                new_values[9] = 0;
                singles[i] -= 2;
            }
            else if(new_values[0] > 0 && new_values[0] <= singles[i]) {
                singles_results[0] = single_types[i];
                new_values[0] = 0;
                singles[i] -= 1;
            }
            else if(new_values[10] > 0 && new_values[10] <= singles[i]) {
                singles_results[10] = single_types[i];
                new_values[10] = 0;
                singles[i] -= 1;
            }
        }while(singles[i] > 0);
    }

    logit();

    console.log(singles);
    console.log(singles_results);
});

function logit() {
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
    console.log("2B-DGR: " + stats.b2_dgr);
    console.log("3B-LF: " + stats.b3_lf);
    console.log("3B-CF: " + stats.b3_cf);
    console.log("3B-RF: " + stats.b3_rf);
    console.log("HR-LF: " + stats.hr_lf);
    console.log("HR-CF: " + stats.hr_cf);
    console.log("HR-RF: " + stats.hr_rf);
    console.log("HBP: " + stats.hbp);
    console.log("BB: " + stats.bb);
    console.log("K: " + stats.k);
    console.log("G1: " + stats.g1);
    console.log("G2: " + stats.g2);
    console.log("G3: " + stats.g3);
    console.log("G4: " + stats.g4);
    console.log("G5: " + stats.g5);
    console.log("G6: " + stats.g6);
    console.log("F7: " + stats.f7);
    console.log("F8: " + stats.f8);
    console.log("F9: " + stats.f9);
    console.log("POP: " + stats.pop);
    console.log("LO: " + stats.lo);
    console.log("GDP: " + stats.gdp);
}

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