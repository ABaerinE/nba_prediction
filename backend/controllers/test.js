const axios = require('axios');
const { PythonShell } = require('python-shell');
const path = require('path');
const {getPlayerID, getPlayerStats} = require('./playerController');
const fs = require('fs');

async function tgetPlayerPrediction(req) {
    const playerName = req.body.playerName;
    const nameArr = playerName.split(" ");
    const firstName = nameArr[0], lastName = nameArr[1];
    const playerID = await getPlayerID(firstName, lastName);
    const playerStats = await getPlayerStats(playerID);

    // Process data and get prediction
    // const formattedStats = formatStatsForPrediction(playerStats.data);

    // let options = {
    //     mode: 'text',
    //     pythonOptions: ['-u'],
    //     scriptPath: path.join(__dirname, '../models/'),
    //     args: [JSON.stringify(formattedStats)]
    // };

    const jsonData = JSON.stringify(playerStats.response);
    fs.writeFileSync('../models/playerStats.json', jsonData, 'utf8');

    // PythonShell.run('predictionModel.py', options, function (err, results) {
    //     if (err) throw err;
    //     // res.json({ prediction: results[0] });
    // });
};

function formatStatsForPrediction(stats) {
    return {
        points: stats.points,
        rebounds: stats.totReb,
        assists: stats.assists
    };
}

tgetPlayerPrediction({body: {
    playerName: "Stephen Curry"
}})