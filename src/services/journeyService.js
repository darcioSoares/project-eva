const Journey = require('../models/Journey');

class JourneyService {

  static async createJourney(data) {
    try {
      const formattedStartDate = new Date(data.startDate);
      const journey = new Journey({
        activity: data.activity,
        description: data.description,
        employeeId: data.employeeId,
        email_employee: data.email_employee,
        startDate: formattedStartDate
      });
      await journey.save();
      return journey;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getAllJourneys() {
    try {
      return await Journey.find();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getJourneyById(id) {
    try {
      const journey = await Journey.findById(id);
      if (!journey) throw new Error('Journey not found');
      return journey;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getJourneysByDateRange(startDate, endDate) {
    try {
      const formattedStartDate = new Date(startDate);
      formattedStartDate.setUTCHours(0, 0, 0, 0);

      const formattedEndDate = new Date(endDate);
      formattedEndDate.setUTCHours(23, 59, 59, 999);

      console.log(`📅 Filtrando jornadas entre ${formattedStartDate.toISOString()} e ${formattedEndDate.toISOString()}`);

      return await Journey.find({
        startDate: { 
          $gte: formattedStartDate,
          $lte: formattedEndDate
        }
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = JourneyService;
