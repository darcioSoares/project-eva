const EmployeeService = require('../services/employeeService');
const Employee = require('../models/Employee');

 
jest.mock('../models/Employee');

describe('Employee Service', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  it('Deve criar um funcionário com sucesso', async () => {
    const mockEmployeeData = {
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '123456789',
      position: 'Developer'
    };

    const mockEmployee = { ...mockEmployeeData, _id: '123abc' };

  
    Employee.mockImplementation((data) => ({
      ...data,  
      _id: '123abc', 
      save: jest.fn().mockResolvedValue()  
    }));

    const createdEmployee = await EmployeeService.createEmployee(mockEmployeeData);

    
    delete createdEmployee.save;

    expect(createdEmployee).toEqual(mockEmployee);
  });

  it('Deve retornar erro ao tentar criar um funcionário com dados inválidos', async () => {
    Employee.mockImplementation(() => ({
      save: jest.fn().mockRejectedValue(new Error('Invalid data'))
    }));

    await expect(EmployeeService.createEmployee({})).rejects.toThrow('Invalid data');
  });

  it('Deve buscar todos os funcionários', async () => {
    const mockEmployees = [
      { _id: '1', name: 'John Doe', email: 'john@email.com' },
      { _id: '2', name: 'Jane Doe', email: 'jane@email.com' }
    ];

    Employee.find.mockResolvedValue(mockEmployees);

    const employees = await EmployeeService.getAllEmployees();

    expect(employees).toEqual(mockEmployees);
  });

  it('Deve retornar erro caso ocorra um problema ao buscar funcionários', async () => {
    Employee.find.mockRejectedValue(new Error('Database error'));

    await expect(EmployeeService.getAllEmployees()).rejects.toThrow('Database error');
  });
});
