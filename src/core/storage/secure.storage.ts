import * as SecureStore from 'expo-secure-store';

/**
 * Secure encrypted key-value storage wrapper
 * Uses Android Keystore / iOS Keychain internally
 */
export const SecureStorage = {
  async set(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
  },

  async get(key: string) {
    return await SecureStore.getItemAsync(key);
  },

  async remove(key: string) {
    return await SecureStore.deleteItemAsync(key);
  },
};
