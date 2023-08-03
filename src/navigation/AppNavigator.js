import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { NAVIGATION, NAV_SIGNUP } from '@/constants/navigation';
import { Login } from '@/screens/Login/Login';
import Landing from '@/screens/Landing/Landing';
import Information from '@/screens/SignUp/Information/Information';
import Email_Verification from '@/screens/Login/Email_Verification';
import ForgotScreen from '@/screens/Login/ForgotScreen';
import Tabs from '@/screens/HomeScreen/Tabs';
import SetLocationScreen from '@/screens/SignUp/SetLocationScreen';
import Introduction from '@/screens/Introduction/Introduction';
import ForgetPassword from '@/screens/Login/ForgetPassword';

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Introduction}
        name={NAVIGATION.introduction}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={Landing}
        name={NAVIGATION.landing}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={Information}
        name={NAV_SIGNUP.information}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={Login}
        name={NAVIGATION.login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={Email_Verification}
        name={NAVIGATION.email}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={ForgotScreen}
        name={NAVIGATION.forgotpw}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={Tabs}
        name={NAVIGATION.home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={SetLocationScreen}
        name={NAVIGATION.set_locaion_screen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={ForgetPassword}
        name={NAVIGATION.ForgetPassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
