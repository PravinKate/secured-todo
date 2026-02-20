import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hooks";
import {
  addTodoSecure,
  deleteTodoSecure,
  updateTodoSecure,
} from "./todo.service";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { Snackbar } from "react-native-paper";

/**
 * Dumb UI Component
 * No business logic here.
 */
const TodoListScreen = () => {
  const [title, setTitle] = useState("");

  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todo.todos);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [snackVisible, setSnackVisible] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const handleAdd = () => {
    if (!title) return;

    if (editingId) {
      dispatch(updateTodoSecure(editingId, title));
      setSnackMessage("Task Updated ✏️");
      setEditingId(null);
    } else {
      dispatch(addTodoSecure(title));
      setSnackMessage("Task Added ✔️");
    }
    setSnackVisible(true);
    setTitle("");
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTodoSecure(id));
    setSnackMessage("Task Deleted 🗑️");
    setSnackVisible(true);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <MaterialIcons
          name="task-alt"
          size={20}
          color="#888"
          style={{ marginRight: 8 }}
        />

        <TextInput
          placeholder="Enter your task..."
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="#999"
          style={styles.input}
        />
      </View>

      <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
        <MaterialIcons
          name={editingId ? "check" : "add"}
          size={24}
          color="white"
        />
      </TouchableOpacity>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text>{item.title}</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  setTitle(item.title);
                  setEditingId(item.id);
                }}
                style={{ marginRight: 10 }}
              >
                <MaterialIcons name="edit" size={24} color="#4CAF50" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <MaterialIcons name="delete" size={24} color="#F44336" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Snackbar
        visible={snackVisible}
        onDismiss={() => setSnackVisible(false)}
        duration={2000}
      >
        {snackMessage}
      </Snackbar>
    </View>
  );
};

export default TodoListScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 2,
    marginBottom: 15,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },

  addButton: {
    backgroundColor: "#2196F3",
    padding: 12,
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 10,
  },

  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    marginTop: 10,
    marginHorizontal: 1,
    borderRadius: 10,
    elevation: 3,
  },
});
