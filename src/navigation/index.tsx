import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoListScreen from '../features/todo/TodoListScreen';
import { RootStackParamList } from './types';
import { useAppDispatch } from '../hooks/redux.hooks';
import { loadTodos } from '../features/todo/todo.persistence';
import { rehydrateTodos } from '../features/todo/todo.slice';

/**
 * Typed Stack Navigator
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
      const init = async () => {
        const todos = await loadTodos();
        dispatch(rehydrateTodos(todos));
      };
  
      init();
    }, []);
    
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
