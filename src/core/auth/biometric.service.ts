import * as LocalAuthentication from "expo-local-authentication";

/**
 * Performs secure device-level authentication.
 * Supports:
 *  - Biometrics (Fingerprint / Face)
 *  - Device Credentials (PIN / Pattern / Password)
 *
 * This is enterprise-safe and works on emulator as well.
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

      /**
       * REQUIRED for Android PIN auth
       */
      cancelLabel: "Cancel",
    });

    return result.success;
  } catch (error) {
    return false;
  }
};
