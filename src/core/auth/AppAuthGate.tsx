import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Button, Text, Platform } from "react-native";
import { authenticateUser } from "./biometric.service";
import * as LocalAuthentication from "expo-local-authentication";
import * as IntentLauncher from "expo-intent-launcher";
import { AppState } from "react-native";
import { SecurityLevel } from "expo-local-authentication";

const AppAuthGate = ({ children }: any) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [secureLock, setSecureLock] = useState(true);

  const verifySecurity = async () => {
    const level = await LocalAuthentication.getEnrolledLevelAsync();

    if (level === SecurityLevel.NONE) {
      setSecureLock(false);
      return;
    }

    setSecureLock(true);

    /**
     * Retry authentication until success
     */
    let authenticated = false;

    while (!authenticated) {
      const success = await authenticateUser();

      if (success) {
        authenticated = true;
        setAuthenticated(true);
      }
    }
  };

  useEffect(() => {
    verifySecurity();

    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        verifySecurity();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  /**
   * Device has NO lock configured
   */
  if (!secureLock) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <Text style={{ marginBottom: 20 }}>
          Please set a device PIN / Pattern to use this app.
        </Text>

        <Button
          title="Go to Security Settings"
          onPress={() => {
            if (Platform.OS === "android") {
              IntentLauncher.startActivityAsync(
                IntentLauncher.ActivityAction.SECURITY_SETTINGS,
              );
            }
          }}
        />
      </View>
    );
  }

  if (!authenticated) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
};

export default AppAuthGate;
