const JourneyService = require('../services/journeyService');

exports.createJourney = async (req, res) => {
  try {
    const { activity, employeeId, email_employee, startDate, description } = req.body;

    if (!activity || !employeeId || !email_employee || !startDate || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const journey = await JourneyService.createJourney(req.body);
    res.status(201).json({ message: 'Journey created successfully', journey });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getJourneys = async (req, res) => {
  try {
    const journeys = await JourneyService.getAllJourneys();
    res.json(journeys);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


