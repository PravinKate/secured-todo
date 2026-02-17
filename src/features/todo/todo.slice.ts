import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from './todo.types';

/**
 * Feature State
 */
interface TodoState {
  todos: Todo[];
}

/**
 * Initial State
 */
const initialState: TodoState = {
  todos: [],
};

/**
 * Pure Slice
 * NOTE:
 * No authentication logic here.
 * Reducers must remain pure functions.
 */
const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<Todo>) {
      state.todos.push(action.payload);
    },

    deleteTodo(state, action: PayloadAction<string>) {
      state.todos = state.todos.filter(
        todo => todo.id !== action.payload
      );
    },
  },
});

export const { addTodo, deleteTodo } = todoSlice.actions;

/**
 * Default Reducer Export
 */
export default todoSlice.reducer;