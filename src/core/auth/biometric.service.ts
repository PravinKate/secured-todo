import * as LocalAuthentication from 'expo-local-authentication';

/**
 * Handles all biometric authentication logic.
 * This layer talks directly to native module.
 */
// export const authenticateUser = async (): Promise<boolean> => {
//   try {
//     /**
//      * Check if device supports biometrics
//      */
//     const hasHardware = await LocalAuthentication.hasHardwareAsync();
//     console.log('Has Hardware:', hasHardware);
//     if (!hasHardware) return false;

//     /**
//      * Check if user has enrolled biometrics
//      */
//     const isEnrolled = await LocalAuthentication.isEnrolledAsync();
//     if (!isEnrolled) return false;

//     /**
//      * Trigger biometric prompt
//      */
//     const result = await LocalAuthentication.authenticateAsync({
//       promptMessage: 'Authenticate to modify your TODOs',
//       fallbackLabel: 'Use device passcode',
//       disableDeviceFallback: false,
//     });

//     return result.success;
//   } catch (error) {
//     return false;
//   }
// };

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
      promptMessage: 'Authenticate to modify your TODOs',

      /**
       * Allows PIN / Pattern / Password fallback
       * when biometric is unavailable.
       */
      disableDeviceFallback: false,

      /**
       * REQUIRED for Android PIN auth
       */
      cancelLabel: 'Cancel',
    });

    return result.success;
  } catch (error) {
    return false;
  }
};
