// todoSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createTodo, fetchTodos, removeTodo, updateTodo } from './thunks';

const initialState = {
  todos: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // addTodo: (state, action) => {
    //   console.log("59", action);
    //   state.todos = [...state.todos, action.payload];
    // },
    // updateTodo: (state, action) => {
    //   state.todos = state.todos.map(todo =>
    //     todo.id === action.payload.id ? action.payload : todo
    //   );
    // },
    // removeTodo: (state, action) => {
    //   state.todos = state.todos.filter(todo => todo.id !== action.payload);
    // },
    toggleTodo: (state, action) => {
      state.todos = state.todos.map(todo =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        console.log("here");
        state.todos.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.todos = state.todos.map(todo => todo.id == action.payload.id ? action.payload : todo
        );
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
      });
  }
});

export const { toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;