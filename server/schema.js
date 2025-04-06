import { gql } from 'apollo-server';

const typeDefs = gql`
  type Todo {
    id: ID!
    task: String!
    completed: Boolean!
    priority: String!
  }

  type Query {
    getTodos(completed: Boolean, priority: String): [Todo!]!
  }

  type Mutation {
    addTodo(task: String!, priority: String!): Todo!
    deleteTodo(id: ID!): ID!
    toggleTodo(id: ID!): Todo!
  }
`;

export default typeDefs;
