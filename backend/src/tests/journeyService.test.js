const JourneyService = require('../services/journeyService');
const Journey = require('../models/Journey');

jest.mock('../models/Journey');

describe('Journey Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Deve criar uma jornada com sucesso', async () => {
    const mockJourneyData = {
      activity: 'Daily Standup Meeting',
      description: 'Reunião diária para alinhar tarefas',
      employeeId: '65d9e2a7f19f2c001b0e5f71',
      email_employee: 'email@email.com',
      startDate: '2024-02-15T15:00:00.000Z' 
    };

    const mockJourney = { ...mockJourneyData, _id: '123abc' };

    Journey.mockImplementation((data) => ({
      ...data,
      _id: '123abc',
      save: jest.fn().mockResolvedValue()
    }));

    const createdJourney = await JourneyService.createJourney(mockJourneyData);
 
    createdJourney.startDate = createdJourney.startDate.toISOString();

 
    delete createdJourney.save;

    expect(createdJourney).toEqual(mockJourney);
  });
});
