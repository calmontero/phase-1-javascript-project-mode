const BASE_URL = "http://lookup-service-prod.mlb.com/json/";

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

function getDataPlayerByName(name) {
    const url = `${BASE_URL}named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='cabrera%25'`;
    return fetch(url , {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    }) 
    .then(res => res.json())
}
/////////////////////////////////////////////////////////////////////

function showData() {
    getDataTeam();
}

function showDataTeam(objTeam) {
    const teamContainer = document.querySelector("#table-body");
        objTeam.forEach(obj => {
        const teamTable = createTableTeam(obj);
        teamContainer.appendChild(teamTable);
    });
}

function showTeamRoster(objTeam) {
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

    tdName.textContent = obj.name_full;
    tdPosition.textContent= obj.position_txt;

    tr.append(tdName,tdPosition);
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
    let id = e.target.dataset.id;
    getRoster(id);
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