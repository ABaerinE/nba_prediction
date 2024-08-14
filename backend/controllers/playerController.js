const axios = require('axios');

async function getPlayerID(firstName, lastName) {
    const lowLastName = lastName.toLowerCase();
    const finLastName = lowLastName[0].toLowerCase() + lowLastName.slice(1);
    var config = {
        method: 'GET',
        url: 'https://api-nba-v1.p.rapidapi.com/players',
        params: {name: finLastName},
        headers: {
            'x-rapidapi-key': 'd6d7a77694mshc98c7cd1c74c922p1ea73djsnc8465fa4fb96',
            'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
        }
    }

    try {
        // Fetch player ID from NBA API
        const response = await axios.request(config);
        const res = response.data.response;

        for (let i = 0; i < res.length; i += 1) {
            if (res[i].firstname.toLowerCase() === firstName.toLowerCase()) {
                return res[i].id
            }
        }

        return null;

    } catch (error) {
        console.error('Error fetching player ID:', error);
        throw error;
    }
};

async function getPlayerStats(playerID) {
    var config  = {
        method: 'GET',
        url: 'https://api-nba-v1.p.rapidapi.com/players/statistics',
        params: {id: `${playerID}`, season: '2023'},
        headers: {
            'x-rapidapi-key': 'd6d7a77694mshc98c7cd1c74c922p1ea73djsnc8465fa4fb96',
            'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
        }
    }

    try {
        //fetch player statistics from NBA API
        const response = await axios.request(config);
        return response.data;
        
    }
    catch (error) {
        console.error('Error fetching player statistics:', error);
        throw error;
    }
}

module.exports = {
    getPlayerID,
    getPlayerStats
};