import { SecureStorage } from '../../core/storage/secure.storage';
import { Todo } from './todo.types';

const TODO_KEY = 'SECURE_TODOS';

/**
 * Save todos securely
 */
export const saveTodos = async (todos: Todo[]) => {
  await SecureStorage.set(
    TODO_KEY,
    JSON.stringify(todos)
  );
};

/**
 * Load todos securely
 */
export const loadTodos = async (): Promise<Todo[]> => {
  const data = await SecureStorage.get(TODO_KEY);

  return data ? JSON.parse(data) : [];
};
