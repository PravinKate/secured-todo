import * as LocalAuthentication from "expo-local-authentication";

/**
 * Performs secure device-level authentication.
 * Supports:
 *  - Biometrics (Fingerprint / Face)
 *  - Device Credentials (PIN / Pattern / Password)
 */
export const authenticateUser = async (): Promise<boolean> => {
  try {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate to proceed",

      /**
       * Allows PIN / Pattern / Password fallback
       * when biometric is unavailable.
       */
      disableDeviceFallback: false,
      cancelLabel: "Cancel",
    });

    return result.success;
  } catch (error) {
    return false;
  }
};
