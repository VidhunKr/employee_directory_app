import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs,resolvers } from './models/employeeModel.js';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // ✅ Handles JSON body

// Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });
await server.start();

app.use('/graphql', expressMiddleware(server));

// Start server
app.listen(4000, () => {
  console.log('Server ready at http://localhost:4000/graphql');
});
