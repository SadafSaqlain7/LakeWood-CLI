
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from '../screens/LandingScreen';
import SignUpLoginScreen from '../screens/SignUpLoginScreen.js';
import LoginScreen from '../screens//authflow/LoginScreen';
import SignUpScreen from '../screens/authflow/SignUpScreen.js';
import ForgetPassword from '../screens/ForgetPassword.js';
import { ROUTES } from '../theme/routes.js';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.LANDING} component={LandingScreen} />
      <Stack.Screen name={ROUTES.SIGNUPLOGIN} component={SignUpLoginScreen} />
      <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
      <Stack.Screen name={ROUTES.SIGNUP} component={SignUpScreen} />
      <Stack.Screen name={ROUTES.FORGETPASSWORD} component={ForgetPassword} />
    </Stack.Navigator>
  );
} 
