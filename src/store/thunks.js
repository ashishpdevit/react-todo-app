
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
// const API_URL = 'https://todo-app-87ffe-default-rtdb.firebaseio.com/tasks.json';

// Async thunk to fetch todos
export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL);
            const data = response.data;
            return Object.keys(data).map(key => ({ ...data[key], id: key }));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Thunk for creating a new todo
export const createTodo = createAsyncThunk(
    'todos/createTodo',
    async (newTodo) => {
        const response = await fetch('https://todo-app-87ffe-default-rtdb.firebaseio.com/tasks.json', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTodo),
        });
        const data = await response.json();
        return { ...newTodo, id: data.name }; // Assuming Firebase returns the ID in `name`
    }
);

// Thunk for updating a todo
export const updateTodo = createAsyncThunk(
    'todos/updateTodo',
    async ({ id, updatedTodo }) => {
        await fetch(`https://todo-app-87ffe-default-rtdb.firebaseio.com/tasks/${id}.json`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTodo),
        });
        return { id, ...updatedTodo };
    }
);

// Thunk for updating a todo
export const removeTodo = createAsyncThunk(
    'todos/removeTodo',
    async ({ id }) => {
        await fetch(`https://todo-app-87ffe-default-rtdb.firebaseio.com/tasks/${id}.json`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
        return { id };
    }
);
