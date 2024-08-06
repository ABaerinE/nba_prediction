const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const predictionRoutes = require('./routes/predictionRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Use the prediction routes
app.use('/api', predictionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
