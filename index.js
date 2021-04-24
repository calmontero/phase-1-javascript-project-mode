const BASE_URL = "http://lookup-service-prod.mlb.com/json/";
/*this variable is to identify the info detail to show
0 - default => Show roster
1 - show player info
*/
let option = 0;

document.addEventListener('DOMContentLoaded', () => {
    showData();
})

///////////////////////FECTH ZONE////////////////////////////////////
const getDataTeam = () => {
    const url = `${BASE_URL}named.team_all_season.bam?sport_code='mlb'&all_star_sw='N'&sort_order=name_asc&season='2021'`;
    return fetch(url , {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    })
    .then(res => res.json())
    .then(res => {
        const team_all_season = res.team_all_season;
        const queryResults = team_all_season.queryResults;
        const row = queryResults.row;
        const teamsArray = [...row];
        showDataTeam(teamsArray);
    })
}

const getRoster = (idTeam) => {
    const url = `${BASE_URL}named.roster_40.bam?team_id=%27${idTeam}%27`;
    return fetch(url , {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    })
    .then(res => res.json())
    .then(res => {
        const roster_40 = res.roster_40;
        const queryResults = roster_40.queryResults;
        const row = queryResults.row;
        const teamsArray = [...row];
        showTeamRoster(teamsArray);
    })
}

function getPlayerById(idPlayer) {
    const url = `${BASE_URL}named.player_info.bam?sport_code='mlb'&player_id=${idPlayer}`;
    return fetch(url , {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    })
    .then(res => res.json())
    .then(res => {
        const player_info = res.roster_40;
        const queryResults = player_info.queryResults;
        const row = queryResults.row;
        const teamsArray = [...row];
        showPlayerInfo(teamsArray);
    })
}

/////////////////////////////////////////////////////////////////////

function showData() {
    getDataTeam();
}

function createTableInfo() {

        const table = document.createElement('table');
        table.setAttribute("id", "table-body2");
        const tr = document.createElement('tr');

        const row = table.insertRow(-1);
        const headerCell0 = document.createElement("TH");
        const headerCell1 = document.createElement("TH");
        headerCell0.innerHTML = "Name";
        headerCell1.innerHTML = "Position";
        row.appendChild(headerCell0);
        row.appendChild(headerCell1);

        //Add data from Array
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        tr.appendChild(td1);
        tr.appendChild(td2);

        table.appendChild(tr);
        document.body.appendChild(table);  
}


function showPlayerInfo(objPlayer) {
    
}

function showDataTeam(objTeam) {
    const teamContainer = document.querySelector("#table-body");
        objTeam.forEach(obj => {
        const teamTable = createTableTeam(obj);
        teamContainer.appendChild(teamTable);
    });
}

function showTeamRoster(objTeam) {
    createTableInfo();
    const rosterContainer = document.querySelector("#table-body2");
    objTeam.forEach(obj => {
        const rosterTable = createTableRoster(obj);
        rosterContainer.appendChild(rosterTable);
    });
}

function createTableRoster(obj) {
    const tr = document.createElement("tr");
    const tdName = document.createElement("td");
    const tdPosition = document.createElement("td");
        //Create Button to select player
        const selectBttn =  document.createElement("td"),
        playerBttn = document.createElement("button");
        playerBttn.innerText = 'Select';
        playerBttn.dataset.id = obj.player_id;
        playerBttn.addEventListener('click', handleClick);
        playerBttn.myParam = 1;
        selectBttn.append(playerBttn);

    tdName.textContent = obj.name_full;
    tdPosition.textContent= obj.position_txt;

    tr.append(tdName,tdPosition,selectBttn);
    return tr;
}

function createTableTeam(obj) {
    const tr = document.createElement("tr");
    const tdName = document.createElement("td");
    const tdCity = document.createElement("td");
    const tdWebSite = document.createElement("td");
    //Create Button to select team
    const selectBttn =  document.createElement("td"),
    teamBttn = document.createElement("button");
    teamBttn.innerText = 'Select';
    teamBttn.dataset.id = obj.team_id;
    teamBttn.addEventListener('click', handleClick);
    teamBttn.myParam = 0;
    selectBttn.append(teamBttn);

    tdName.textContent = obj.name_display_full;
    tdCity.textContent = obj.city;
    //add url
    const a = document.createElement("a");
    a.target = '_blank';
    a.href = `https://${obj.base_url}`;
    a.textContent = obj.base_url; 
    tdWebSite.appendChild(a);
    tr.append(tdName,tdCity,tdWebSite,selectBttn);
    
    return tr;    
}

function handleClick(e) {
    //clearContainer();
    let option = e.target.myParam
    let id = e.target.dataset.id;

    if (option === 0) {    
        getRoster(id);
    } else {
        console.log(id);
    }
}

function clearContainer() {
    var elementExists = document.getElementById("table-body2");
    if (elementExists != null) {
        const listEmpty = elementExists.innerHTML.trim();
        if (listEmpty != "") {
            elementExists.innerHTML = ""; 
        }
    }
}
    



/*
const teamContainer = document.querySelector("#table-body");
teamContainer.addEventListener("click", (e) {
    console.log("Click");
})*/


/* OPTION CONTAINER
function showDataTeam(objTeam) {
    const dataContainer = document.getElementById("team-container");
    objTeam.forEach(obj => {
        const teamDiv = createDivTeamConteiner(obj);
        dataContainer.appendChild(teamDiv);
    });
}

function createDivTeamConteiner(obj) {
    const div = document.createElement("div"),
    name_display_full = document.createElement("p"),
    city = document.createElement("p"),
    website_url = document.createElement("p"),
    division_ful = document.createElement("p");

    name_display_full.textContent = obj.name_display_full;
    city.textContent = obj.city;
    website_url.textContent = obj.website_url;
    division_ful.textContent = obj.division_ful;
    
    div.appendChild(name_display_full);
    div.appendChild(city);
    div.appendChild(website_url);
    div.appendChild(division_ful);

    return div;
}
*/