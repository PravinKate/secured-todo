import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import AppNavigator from "./src/navigation";
import AppAuthGate from "./src/core/auth/AppAuthGate";
import { Provider as PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <AppAuthGate>
          <AppNavigator />
        </AppAuthGate>
      </PaperProvider>
    </Provider>
  );
}
