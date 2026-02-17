import { authenticateUser } from '../auth/biometric.service';

/**
 * Guard function to enforce authentication
 * before any state mutation occurs.
 *
 * UI cannot bypass this layer.
 */
export const withAuthGuard = async (
  mutationCallback: Function
) => {
  const success = await authenticateUser();

  if (!success) return;

  mutationCallback();
};
