import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { addTodoSecure, deleteTodoSecure } from './todo.service';

/**
 * Dumb UI Component
 * No business logic here.
 */
const TodoListScreen = () => {
  const [title, setTitle] = useState('');

  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todo.todos);

  const handleAdd = () => {
    if (!title) return;
    dispatch(addTodoSecure(title));
    setTitle('');
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTodoSecure(id));
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Enter Todo"
        value={title}
        onChangeText={setTitle}
        style={{
          borderWidth: 1,
          marginBottom: 10,
          padding: 10,
        }}
      />

      <Button title="Add Todo" onPress={handleAdd} />

      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}
          >
            <Text>{item.title}</Text>
            <Button
              title="Delete"
              onPress={() => handleDelete(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
};

export default TodoListScreen;
