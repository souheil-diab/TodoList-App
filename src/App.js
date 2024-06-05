import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTodos } from './features/todos/todosSlice';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import './App.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className="app">
      <h1>Todo List</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
};

export default App;
