import React, { useContext, useReducer, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';

// Create a context
const AuthContext = React.createContext({});

const AuthProvider = ({ children }) => {
  const [auth, setAuthState] = useState(null);

  // Get current auth state from AsyncStorage
  const getAuthState = async () => {
   
      const authDataString = await AsyncStorage.getItem("authUser");
      console.log("alus", authDataString)
      const authData = JSON.parse(authDataString || {});
      console.log("alus", authData)
      setAuthState(authData);
      console.log("alu check", auth)
    
  };

  // Set current auth state in AsyncStorage 
  useEffect(() => {
    getAuthState();
  }, []);

  return (
    <AuthContext.Provider value={{ auth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
