import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import Todo from './Todo';

const GET_TODOS = gql`
  query GetTodos {
    getTodos {
      id
      task
      completed
      priority
    }
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($task: String!, $priority: String!) {
    addTodo(task: $task, priority: $priority) {
      id
      task
      completed
      priority
    }
  }
`;

function TodoList() {
  const { data, loading, error } = useQuery(GET_TODOS);
  const [addTodo] = useMutation(ADD_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task) return;
    addTodo({ variables: { task, priority } });
    setTask('');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching todos</p>;

  return (
    <div className="container">
      <h1>📝 To-Do List</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="What needs to be done?"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button type="submit">Add</button>
      </form>

      {data.getTodos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

export default TodoList;
