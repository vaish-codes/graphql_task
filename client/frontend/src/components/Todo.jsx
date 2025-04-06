import React from 'react';
import { useMutation, gql } from '@apollo/client';

const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: ID!) {
    toggleTodo(id: $id) {
      id
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;

function Todo({ todo }) {
  const [toggleTodo] = useMutation(TOGGLE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: ['GetTodos'],
  });

  return (
    <div className={`todo ${todo.completed ? 'done' : ''}`}>
      <span onClick={() => toggleTodo({ variables: { id: todo.id } })}>
        {todo.task} ({todo.priority})
      </span>
      <button onClick={() => deleteTodo({ variables: { id: todo.id } })}>🗑️</button>
    </div>
  );
}

export default Todo;
