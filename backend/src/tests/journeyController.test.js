const JourneyController = require('../controllers/journeyController');
const JourneyService = require('../services/journeyService');

 
jest.mock('../services/journeyService');

describe('Journey Controller', () => {
  let req, res;

  beforeEach(() => {
    req = { body: {}, params: {}, query: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  it('Deve criar uma jornada com sucesso', async () => {
    req.body = {
      activity: 'Meeting',
      employeeId: '123',
      email_employee: 'email@email.com',
      startDate: '2025-02-16T15:30:00.000Z',
      description: 'Reunião diária'
    };

    const mockJourney = { ...req.body, _id: '65d9e2a7f19f2c001b0e5f71' };
    JourneyService.createJourney.mockResolvedValue(mockJourney);

    await JourneyController.createJourney(req, res);

    expect(JourneyService.createJourney).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Journey created successfully', journey: mockJourney });
  });

  it('Deve retornar erro 400 se faltar campos obrigatórios', async () => {
    req.body = {};  

    await JourneyController.createJourney(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Missing required fields' });
  });

  it('Deve buscar todas as jornadas', async () => {
    const mockJourneys = [
      { _id: '1', activity: 'Meeting', email_employee: 'email@email.com' },
      { _id: '2', activity: 'Training', email_employee: 'email2@email.com' }
    ];

    JourneyService.getAllJourneys.mockResolvedValue(mockJourneys);

    await JourneyController.getJourneys(req, res);

    expect(res.json).toHaveBeenCalledWith(mockJourneys);
  });

  it('Deve retornar erro 500 se houver falha no serviço', async () => {
    JourneyService.getAllJourneys.mockRejectedValue(new Error('Database error'));

    await JourneyController.getJourneys(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
  });
});
