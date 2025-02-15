const express = require('express');
const router = express.Router();
const journeyController = require('../controllers/journeyController');

// 🔥 Nova rota para buscar jornadas filtradas por data
router.get('/filter-by-date', journeyController.getJourneysByDateRange);

router.post('/', journeyController.createJourney);
router.get('/', journeyController.getJourneys);
router.get('/:id', journeyController.getJourneyById);



module.exports = router;
