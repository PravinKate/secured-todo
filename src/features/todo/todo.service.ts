import { AppDispatch } from '../../app/store';
import { addTodo, deleteTodo } from './todo.slice';
import { withAuthGuard } from '../../core/guard/mutation.guard';

/**
 * Auth Protected Add Todo
 */
export const addTodoSecure =
  (title: string) =>
  async (dispatch: AppDispatch) => {
    await withAuthGuard(() => {
      dispatch(
        addTodo({
          id: Date.now().toString(),
          title,
        })
      );
    });
  };

/**
 * Auth Protected Delete Todo
 */
export const deleteTodoSecure =
  (id: string) =>
  async (dispatch: AppDispatch) => {
    await withAuthGuard(() => {
      dispatch(deleteTodo(id));
    });
  };
