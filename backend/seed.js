import { connectDB } from "./config/db.js";

const employees = [
  { name: 'Alice', position: 'Developer', department: 'IT', salary: 60000 },
  { name: 'Bob', position: 'Manager', department: 'HR', salary: 75000 },
  { name: 'Carol', position: 'Designer', department: 'Marketing', salary: 50000 },
  { name: 'Dan', position: 'Tester', department: 'IT', salary: 45000 },
  { name: 'Eve', position: 'Analyst', department: 'Finance', salary: 55000 },
];

const seed = async () => {
  const db = await connectDB();
  await db.collection('employees').deleteMany({});
  await db.collection('employees').insertMany(employees);
  console.log('Seeded DB');
};

seed();
