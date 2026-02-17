import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import { View, Text } from 'react-native';

export default function App() {
  return (
    <Provider store={store}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text>Secured TODO App</Text>
      </View>
    </Provider>
  );
}
