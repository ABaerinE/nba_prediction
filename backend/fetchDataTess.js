const axios = require('axios');
const { PythonShell } = require('python-shell');
const path = require('path');
const { getPlayerPrediction } = require('./controllers/predictionController');

let getPlayerPredictions = async () => {

    var config = {
        method: 'GET',
        url: 'https://api-nba-v1.p.rapidapi.com/players',
        params: {name: 'Curry'},
        headers: {
            'x-rapidapi-key': 'd6d7a77694mshc98c7cd1c74c922p1ea73djsnc8465fa4fb96',
            'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
        }
    }

    try {
        // Fetch player stats from NBA API
        const response = await axios.request(config);
        
        // Check if the API call was successful

        // Process data and get prediction
        const playerStats = response;
        console.log('Player Stats:', playerStats.data);
        

    } catch (error) {
        console.error('Error:', error);
    }
};

getPlayerPredictions();
