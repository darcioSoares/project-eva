const Journey = require('../models/Journey');
const jobQueue = require('../services/queueService');

exports.createJourney = async (req, res) => {
  try {
    const { activity, employeeId, startDate } = req.body;

    if (!activity || !employeeId || !startDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    const journey = new Journey({ activity, employeeId, startDate });
    await journey.save();
   
    const delay = new Date(startDate).getTime() - Date.now();
    await jobQueue.add(
      'processJourney',
      { journeyId: journey._id },
      { delay: Math.max(delay, 0) } //job não seja agendado no passado
    );

    res.status(201).json({ message: 'Journey created and job scheduled', journey });
  } catch (error) {
    res.status(500).json({ error: error.message });
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


