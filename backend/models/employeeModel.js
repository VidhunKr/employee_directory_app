import gql from "graphql-tag";

export const typeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    position: String!
    department: String!
    salary: Float!
  }

  type Query {
    getAllEmployees: [Employee!]!
    getEmployeeById(id: ID!): Employee
  }

  type Mutation {
    addEmployee(name: String!, position: String!, department: String!, salary: Float!): Employee
    updateEmployee(id: ID!, name: String, position: String, department: String, salary: Float): Employee
    deleteEmployee(id: ID!): Boolean
  }
`;


import { ObjectId } from 'mongodb';
import { connectDB } from "../config/db.js";


export const resolvers = {
  Query: {
    getAllEmployees: async () => {
      const db = await connectDB();
      const employees = await db.collection('employees').find().toArray();

      return employees.map(emp => ({
        id: emp._id.toString(),
        name: emp.name,
        position: emp.position,
        department: emp.department,
        salary: emp.salary,
      }));
    },

    getEmployeeById: async (_, { id }) => {
      const db = await connectDB();
      const employee = await db.collection('employees').findOne({ _id: new ObjectId(id) });

      if (!employee) return null;

      return {
        id: employee._id.toString(),
        name: employee.name,
        position: employee.position,
        department: employee.department,
        salary: employee.salary,
      };
    },
  },

  Mutation: {
    addEmployee: async (_, { name, position, department, salary }) => {
      const db = await connectDB();
      const result = await db.collection('employees').insertOne({ name, position, department, salary });

      return {
        id: result.insertedId.toString(),
        name,
        position,
        department,
        salary,
      };
    },

    updateEmployee: async (_, { id, ...updates }) => {
      const db = await connectDB();
      await db.collection('employees').updateOne({ _id: new ObjectId(id) }, { $set: updates });

      const updatedEmployee = await db.collection('employees').findOne({ _id: new ObjectId(id) });

      return {
        id: updatedEmployee._id.toString(),
        name: updatedEmployee.name,
        position: updatedEmployee.position,
        department: updatedEmployee.department,
        salary: updatedEmployee.salary,
      };
    },

    deleteEmployee: async (_, { id }) => {
      const db = await connectDB();
      const result = await db.collection('employees').deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount === 1;
    },
  },
};
