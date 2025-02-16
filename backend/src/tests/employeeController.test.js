const EmployeeController = require('../controllers/employeeController');
const EmployeeService = require('../services/employeeService');

jest.mock('../services/employeeService');

describe('Employee Controller', () => {
  let req, res;

  beforeEach(() => {
    req = { body: {}, params: {}, query: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  it('Deve criar um funcionário com sucesso', async () => {
    req.body = {
      name: 'Darcio ss',
      email: 'Darcio.doe@email.com',
      phone: '123456789',
      position: 'Developer'
    };

    const mockEmployee = { ...req.body, _id: '123abc' };
    EmployeeService.createEmployee.mockResolvedValue(mockEmployee);

    await EmployeeController.createEmployee(req, res);

    expect(EmployeeService.createEmployee).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockEmployee);
  });

  it('Deve retornar erro 400 se faltar campos obrigatórios', async () => {
    req.body = {};

    await EmployeeController.createEmployee(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Missing required fields' });
  });

  it('Deve buscar todos os funcionários', async () => {
    const mockEmployees = [
      { _id: '1', name: 'Darcio Doe', email: 'Darcio@email.com' },
      { _id: '2', name: 'Darcio ss', email: 'jane@email.com' }
    ];

    EmployeeService.getAllEmployees.mockResolvedValue(mockEmployees);

    await EmployeeController.getEmployees(req, res);

    expect(res.json).toHaveBeenCalledWith(mockEmployees);
  });

  it('Deve retornar erro 500 se houver falha no serviço', async () => {
    EmployeeService.getAllEmployees.mockRejectedValue(new Error('Database error'));

    await EmployeeController.getEmployees(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
  });
});
