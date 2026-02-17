import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/todo/todo.slice';

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
