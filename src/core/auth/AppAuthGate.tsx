import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { authenticateUser } from './biometric.service';

interface Props {
  children: React.ReactNode;
}

/**
 * Blocks app access until user authenticates
 */
const AppAuthGate = ({ children }: Props) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const verify = async () => {
      const success = await authenticateUser();

      if (success) {
        setAuthenticated(true);
      } else {
        verify(); // retry until success
      }
    };

    verify();
  }, []);

  if (!authenticated) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
};

export default AppAuthGate;
