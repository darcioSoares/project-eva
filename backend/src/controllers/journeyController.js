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

exports.getJourneyById = async (req, res) => {
  try {
    const journey = await JourneyService.getJourneyById(req.params.id);
    res.json(journey);
  } catch (error) {
    res.status(error.message === 'Journey not found' ? 404 : 500).json({ error: error.message });
  }
};

exports.getJourneysByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: "Both startDate and endDate are required" });
    }

    const journeys = await JourneyService.getJourneysByDateRange(startDate, endDate);
    res.json({ count: journeys.length, journeys });
  } catch (error) {
    console.error("❌ Erro ao buscar jornadas por data:", error);
    res.status(500).json({ error: error.message });
  }
};
