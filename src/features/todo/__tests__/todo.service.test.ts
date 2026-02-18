/**
 * MOCK the entire biometric service
 * BEFORE importing todo.service
 */
jest.mock('../../../core/auth/biometric.service', () => ({
    authenticateUser: jest.fn().mockResolvedValue(true),
  }));
  
  import { addTodoSecure } from '../todo.service';
  
  describe('Todo Secure Service', () => {
    it('should dispatch addTodo after authentication success', async () => {
      const dispatch = jest.fn();
  
      await addTodoSecure('Test Todo')(dispatch as any);
  
      expect(dispatch).toHaveBeenCalled();
    });
  });
  