import { ApolloServer } from 'apollo-server';
import typeDefs from './schema.js';
import { v4 as uuidv4 } from 'uuid';

let todos = [];

const resolvers = {
  Query: {
    getTodos: (_, { completed, priority }) => {
      let filtered = todos;
      if (completed !== undefined) {
        filtered = filtered.filter(todo => todo.completed === completed);
      }
      if (priority) {
        filtered = filtered.filter(todo => todo.priority === priority);
      }
      return filtered;
    },
  },
  Mutation: {
    addTodo: (_, { task, priority }) => {
      const newTodo = { id: uuidv4(), task, completed: false, priority };
      todos.push(newTodo);
      return newTodo;
    },
    deleteTodo: (_, { id }) => {
      todos = todos.filter(todo => todo.id !== id);
      return id;
    },
    toggleTodo: (_, { id }) => {
      const todo = todos.find(todo => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
        return todo;
      }
      throw new Error('Todo not found');
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
