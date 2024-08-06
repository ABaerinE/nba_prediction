const axios = require('axios');
const { PythonShell } = require('python-shell');
const path = require('path');

exports.getPlayerPrediction = async (req, res) => {
    const { playerName } = req.body;

    var config = {
        method: 'get',
        url: 'https://api-nba-v1.p.rapidapi.com/players',
        qs: {id: 265},
        headers: {
            'x-rapidapi-key': 'YOUR_RAPIDAPI_KEY',
            'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
        }
    }

    try {
        // Fetch player stats from NBA API
        const response = await axios(config)

        // Process data and get prediction
        const playerStats = response.data;
        const formattedStats = formatStatsForPrediction(playerStats);

        let options = {
            mode: 'text',
            pythonOptions: ['-u'],
            scriptPath: path.join(__dirname, '../models/'),
            args: [JSON.stringify(formattedStats)]
        };

        PythonShell.run('predictionModel.py', options, function (err, results) {
            if (err) throw err;
            res.json({ prediction: results[0] });
        });
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error getting prediction');
    }
};

function formatStatsForPrediction(stats) {
    return {
        points: stats.points,
        rebounds: stats.rebounds,
        assists: stats.assists
    };
}
