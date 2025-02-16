const Employee = require('../models/Employee');

class EmployeeService {

  static async createEmployee(data) {
    try {
      const employee = new Employee(data);
      await employee.save();
      return employee;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getAllEmployees() {
    try {
      return await Employee.find();
    } catch (error) {
      throw new Error(error.message);
    }
  }

}

module.exports = EmployeeService;
