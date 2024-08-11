async function getPrediction() {
    const playerName = document.getElementById('playerName').value;
    try {
        const response = await fetch('http://127.0.0.1:5001/api/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ playerName }),
        });
        console.log(playerName);
        const data = await response.json();
        document.getElementById('prediction').innerText = `Prediction: ${data.prediction}`;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('prediction').innerText = 'Error getting prediction';
    }
}
