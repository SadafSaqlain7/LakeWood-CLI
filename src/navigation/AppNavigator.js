
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import { createContext } from 'react';
import { useContext } from 'react';
import MainNavigator from './MainNavigator';
import { useState } from 'react';
import { AuthContext } from '../../App.js';

export default function AppNavigator() {

   const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {/* {user ? (
        <MainNavigator  />
      ) : (
        <AuthNavigator />
      )} */}
      <AuthNavigator />
    </NavigationContainer>
  );
}
