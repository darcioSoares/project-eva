const EmployeeService = require('../services/employeeService');

exports.createEmployee = async (req, res) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.phone || !req.body.position) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const employee = await EmployeeService.createEmployee(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await EmployeeService.getAllEmployees();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await EmployeeService.getEmployeeById(req.params.id);
    res.json(employee);
  } catch (error) {
    res.status(error.message === 'Employee not found' ? 404 : 500).json({ error: error.message });
  }
};
