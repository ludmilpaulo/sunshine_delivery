import React from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import AppNavigator from './navigation/AppNavigator'
import { AuthProvider } from './redux/AuthContext';

export default function App() {
  return (
     <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <Provider store={store}>
          <AppNavigator />
        </Provider>
    </AuthProvider>
    </GestureHandlerRootView>
  );
}