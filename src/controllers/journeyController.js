const Journey = require('../models/Journey');
const jobQueue = require('../services/queueService');

exports.createJourney = async (req, res) => {
  try {
    const { activity, employeeId, email_employee, startDate } = req.body;

    if (!activity || !employeeId || !email_employee || !startDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const formattedStartDate = new Date(startDate);

    const journey = new Journey({
      activity,
      employeeId,
      email_employee,
      startDate: formattedStartDate
    });

    await journey.save();

    res.status(201).json({ message: 'Journey created successfully', journey });
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


exports.getJourneysByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: "Both startDate and endDate are required" });
    }

    // 🔥 Converte as datas para objetos `Date`
    const formattedStartDate = new Date(startDate);
    formattedStartDate.setUTCHours(0, 0, 0, 0); // Início do dia

    const formattedEndDate = new Date(endDate);
    formattedEndDate.setUTCHours(23, 59, 59, 999); // Final do dia

    console.log(`📅 Filtrando jornadas entre ${formattedStartDate.toISOString()} e ${formattedEndDate.toISOString()}`);

    // 🔥 Busca no MongoDB todas as jornadas dentro do intervalo
    const journeys = await Journey.find({
      startDate: { 
        $gte: formattedStartDate, // Começa no início da data especificada
        $lte: formattedEndDate // Termina no final da data especificada
      }
    });

    res.json({ count: journeys.length, journeys });
  } catch (error) {
    console.error("❌ Erro ao buscar jornadas por data:", error);
    res.status(500).json({ error: error.message });
  }
};