import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "./todo.types";

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
 * To keep Reducers as pure functions.
 */
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<Todo>) {
      state.todos.push(action.payload);
    },

    deleteTodo(state, action: PayloadAction<string>) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },

    rehydrateTodos(state, action: PayloadAction<Todo[]>) {
      state.todos = action.payload;
    },

    updateTodo(state, action: PayloadAction<{ id: string; title: string }>) {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id,
      );

      if (index !== -1) {
        state.todos[index].title = action.payload.title;
      }
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, rehydrateTodos } =
  todoSlice.actions;

/**
 * Default Reducer Export
 */
export default todoSlice.reducer;
