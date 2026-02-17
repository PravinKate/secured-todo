import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoListScreen from '../features/todo/TodoListScreen';
import { RootStackParamList } from './types';

/**
 * Typed Stack Navigator
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator id="root-stack">
        <Stack.Screen
          name="Todos"
          component={TodoListScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
