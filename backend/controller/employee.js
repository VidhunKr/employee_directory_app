
import { employeeModel } from '../models/employeeModel.js';

export const getAllEmployee = async (req, res) => {
  const { department } = req.query;
  const filter = department ? { department } : {};
  const employees = await employeeModel.find(filter).select('name position department');
  res.json(employees);
}

export const getEmployeeById = async (req, res) => {
  try {
    const employee = await employeeModel.findById(req.params.id);
    if (!employee) return res.status(404).send('Not found');
    res.json(employee);
  } catch {
    res.status(400).send('Invalid ID');
  }
}

export const CreateEmployee = async (req, res) => {
  try {
    const emp = new employeeModel(req.body);
    await emp.save();
    res.status(201).json(emp);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}
