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

}


module.exports = JourneyService;
