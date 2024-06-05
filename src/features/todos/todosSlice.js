import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
//import { v4 as uuidv4 } from 'uuid';

//Helper function to generate the next ID
let nextId = 201;

const generateNextId = () => {
  return nextId++;
};

// Fetch todos
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10');
  return response.data;
});

// Add todo
export const addTodo = createAsyncThunk('todos/addTodo', async (title) => {
 // const id = uuidv4();
  const id = generateNextId();
  const response = await axios.post('https://jsonplaceholder.typicode.com/todos', { id, title, completed: false });
  return { ...response.data, id };
});

// Delete todo
export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
  return id;
});

// Update todo
export const updateTodo = createAsyncThunk('todos/updateTodo', async ({ id, title }) => {
  await axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`, { title });
  return { id, title };
});

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    toggleComplete(state, action) {
      const todo = state.items.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter(todo => todo.id !== action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const { id, title } = action.payload;
        const index = state.items.findIndex(todo => todo.id === id);
        if (index !== -1) {
          state.items[index].title = title;
        }
      });
  }
});

export const { toggleComplete } = todosSlice.actions;

export default todosSlice.reducer;
