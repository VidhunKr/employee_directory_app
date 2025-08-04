import mongoose from 'mongoose';
import { employeeModel } from './models/employeeModel.js';

const seed = async () => {
  await mongoose.connect("mongodb+srv://Vidhun:VidhunKr@cluster0.4rthhgp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

  await employeeModel.deleteMany({});
  await employeeModel.insertMany([
    { name: 'Alice', position: 'Developer', department: 'Engineering', salary: 60000 },
    { name: 'Bob', position: 'Designer', department: 'UI/UX', salary: 50000 },
    { name: 'Carol', position: 'Manager', department: 'HR', salary: 70000 },
    { name: 'Dave', position: 'Tester', department: 'Engineering', salary: 55000 },
    { name: 'Eve', position: 'Support', department: 'IT', salary: 45000 },
  ]);

  console.log('Seed data inserted');
  mongoose.disconnect();
};

seed();