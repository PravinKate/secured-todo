import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/todo/todo.slice';
import { saveTodos } from '../features/todo/todo.persistence';

/**
 * Global Redux Store
 */
export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

/**
 * RootState - used for selectors
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * AppDispatch - used for dispatch typing
 */
export type AppDispatch = typeof store.dispatch;

/**
 * Persist todos securely on every change
 */
store.subscribe(() => {
  const state = store.getState();
  saveTodos(state.todo.todos);
});
