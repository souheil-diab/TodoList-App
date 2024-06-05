import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleComplete, deleteTodo, updateTodo } from '../features/todos/todosSlice';
import TodoItem from './TodoItem';

const TodoList = () => {
  const todos = useSelector(state => state.todos.items);
  const loading = useSelector(state => state.todos.loading);
  const error = useSelector(state => state.todos.error);
  const dispatch = useDispatch();

  return (
    <ul className="todo-list">
     
     {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        todos.map(todo => (
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            toggleComplete={() => dispatch(toggleComplete(todo.id))} 
            deleteTodo={() => dispatch(deleteTodo(todo.id))} 
            updateTodo={(id, title) => dispatch(updateTodo({ id, title }))} // Dispatch updateTodo directly
          />
        ))
      )}
    </ul>
  );
};

export default TodoList;
