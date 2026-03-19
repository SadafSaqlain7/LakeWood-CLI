import { useState, useEffect, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();
const STORAGE_KEY = "APP_USER"; 

export const AuthProvider = ({ children }) => {

  const [user, setUserState] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedUser) {
          setUserState(JSON.parse(storedUser));
        }
      } catch (error) {
        console.log("Error loading user", error);
      } finally {
        setLoading(false);
      }
    };
    loadUser(); 
  }, []);


  const setUser = async (newUser) => {
    try {
      if (newUser) {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      } else {
        await AsyncStorage.removeItem(STORAGE_KEY);
      }
      setUserState(newUser);
    } catch (error) {
      console.log("Error saving user", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setUserState(null);
    } catch (error) {
      console.log("Error logging out", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, selectedRole, setSelectedRole, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
      <Toast />
    </AuthProvider>
  );
}