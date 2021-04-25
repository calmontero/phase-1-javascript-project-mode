# Summary

# MVP
- Users should see a list with all MLB teams active in 2021 season
- Users should be able to press a button in the list teams to see the Rosters of each one
- Users should be visit the official web page of each team press the link in the team list

# Roadmap
- Create file structure
- fetch the data
    - Use the API
        - For teams list => http://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code='mlb'&all_star_sw='N'&sort_order=name_asc&season='2021'
        - For rosters list => http://lookup-service-prod.mlb.com/json/named.roster_40.bam?team_id=%27${idTeam}%27`
- Modify the DOM in some way
    - create a reusable function to show data
    - open a new tab when press the website link of the teams
    - the 2 div have to be one by side
    - h1 with background red an align to center, and font Garamond
    - tables with border
