const Journey = require('../models/Journey');

exports.createJourney = async (req, res) => {
  try {
    const journey = new Journey(req.body);
    await journey.save();
    res.status(201).json(journey);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getJourneys = async (req, res) => {
  try {
    const journeys = await Journey.find().populate('employeeId');
    res.json(journeys);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getJourneyById = async (req, res) => {
  try {
    const journey = await Journey.findById(req.params.id).populate('employeeId');
    if (!journey) return res.status(404).json({ message: 'Journey not found' });
    res.json(journey);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


