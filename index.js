const BASE_URL = "https://lookup-service-prod.mlb.com/json/";

document.addEventListener('DOMContentLoaded', () => {
    getDataTeam();
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
        showData(teamsArray,0);
    })
    .catch(err => console.log(err))
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
        showData(teamsArray,1);
    })
    .catch(err => console.log(err))
}

/////////////////////////////////////////////////////////////////////

function createHeaderTable(objTable) {
    const table = objTable;
    const row = table.insertRow(-1);
    const headerCell0 = document.createElement("TH");
    const headerCell1 = document.createElement("TH");
    const headerCell2 = document.createElement("TH");
    headerCell0.innerHTML = "Name";
    headerCell1.innerHTML = "Position";
    headerCell2.textContent = "Team";

    row.appendChild(headerCell0);
    row.appendChild(headerCell1);
    row.appendChild(headerCell2);

    document.body.appendChild(table);  
}

function showData(objTeam,option) {
    objTeam.forEach(obj => {
        if (option === 0) {
            const dataTeamContainer = document.querySelector("#table-body");
            const dataTable = createTableTeam(obj);
            dataTeamContainer.appendChild(dataTable);
        } else {
            const dataRosterContainer = document.querySelector("#table-body2");
            const rosterTable = createTableRoster(obj);
            dataRosterContainer.appendChild(rosterTable);
        }
    });
}

function createTableTeam(obj) {
    const tr = document.createElement("tr");
    const tdName = document.createElement("td");
    const tdCity = document.createElement("td");
    const tdWebSite = document.createElement("td");
        //Create Button to select roster/////////////////////
        const selectBttn =  document.createElement("td"),
        teamBttn = document.createElement("button");
        teamBttn.innerText = 'Roster';
        teamBttn.dataset.id = obj.team_id;
        teamBttn.addEventListener('click', handleClick);
        selectBttn.append(teamBttn);

        //add url
        const a = document.createElement("a");
        a.target = '_blank';
        a.href = `https://${obj.base_url}`;
        a.textContent = obj.base_url; 
        tdWebSite.appendChild(a);
        ////////////////////////////////////////////////////
        
    tdName.textContent = obj.name_display_full;
    tdCity.textContent = obj.city;
    tr.append(tdName,tdCity,tdWebSite,selectBttn);
    return tr;    
}

function createTableRoster(obj) {
    const tr = document.createElement("tr");
    const tdName = document.createElement("td");
    const tdPosition = document.createElement("td");
    const tdTeam = document.createElement("td");
    tdName.textContent = obj.name_full;
    tdPosition.textContent = obj.position_txt;
    tdTeam.textContent = obj.team_name;
    tr.append(tdName,tdPosition,tdTeam);
    return tr;
}

function handleClick(e) {
    clearContainer();
    let id = e.target.dataset.id;
    getRoster(id);
}

function clearContainer() {
    //Verify if table exists
    const elementExists = document.querySelector("#table-body2");
    if (elementExists != null) {
        const listEmpty = elementExists.innerHTML.trim();
        if (listEmpty != "") {
            //Clean table
            elementExists.innerHTML = ""; 
            createHeaderTable(elementExists);
        }
    } else {
        //Create new table
        const table = document.createElement('table');
        table.setAttribute("id", "table-body2");
        createHeaderTable(table);
    }
}