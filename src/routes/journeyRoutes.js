const express = require('express');
const router = express.Router();
const journeyController = require('../controllers/journeyController');

router.post('/', journeyController.createJourney);
router.get('/', journeyController.getJourneys);
router.get('/:id', journeyController.getJourneyById);

module.exports = router;
