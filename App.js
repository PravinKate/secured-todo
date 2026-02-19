import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import AppNavigator from './src/navigation';
import AppAuthGate from './src/core/auth/AppAuthGate';

export default function App() {
  return (
    <Provider store={store}>
      <AppAuthGate>
        <AppNavigator />
      </AppAuthGate>
    </Provider>
  );
}
