const express = require('express');
const router = express.Router();
const { getPlayerPrediction } = require('../controllers/predictionController');

router.post('/predict', getPlayerPrediction);

module.exports = router;
