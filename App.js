import { useFonts } from 'expo-font';
import { useState } from 'react';
import AppNavigator from './navigation/AppNavigator';
import { createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('');

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    'Urbanist-Regular': require('./assets/fonts/Urbanist-Regular.ttf'),
    'Urbanist-Bold': require('./assets/fonts/Urbanist-Bold.ttf'),
    'Urbanist-SemiBold': require('./assets/fonts/Urbanist-SemiBold.ttf'),
    'Urbanist-Medium': require('./assets/fonts/Urbanist-Medium.ttf'),
    'Urbanist-Light': require('./assets/fonts/Urbanist-Light.ttf'),
    'RockSalt-Regular': require('./assets/fonts/RockSalt-Regular.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}