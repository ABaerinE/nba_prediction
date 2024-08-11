const axios = require('axios');
const { PythonShell } = require('python-shell');
const path = require('path');
const fs = require('fs');
const {getPlayerID, getPlayerStats} = require('./playerController')

async function getPlayerPrediction(req, res) {
    const playerName = req.body.playerName;
    const nameArr = playerName.split(" ");
    const firstName = nameArr[0], lastName = nameArr[1];
    const playerID = await getPlayerID(firstName, lastName);
    const playerStats = await getPlayerStats(playerID);


    // Process data and get prediction
    const jsonData = JSON.stringify(playerStats.response);
    const filePath = path.join(__dirname, '../models/playerStats.json');
    fs.writeFileSync(filePath, jsonData, 'utf8');

    let options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: path.join(__dirname, '../models/'),
        args: [filePath]
    };

    PythonShell.run('predictionModel.py', options)
    .then(results => {
        res.json({prediction: results[0]});
    })
    .catch(err => {
        console.error(err);
        throw err;
    });
};

module.exports = {
    getPlayerPrediction
}