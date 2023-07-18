import { NAVIGATION } from '@/constants';
import SettingScreen from '@/screens/PrfileScreen/SettingScreen';
import BlockedUserScreen from '@/screens/SettingScreens/BlockedUserScreen';
import ChangePassword from '@/screens/SettingScreens/ChangePassword';
import CreatePinScreen from '@/screens/SettingScreens/CreatePinScreen';
import PrivacyPolicy from '@/screens/SettingScreens/PrivacyPolicy';
import Terms_Condition from '@/screens/SettingScreens/Terms_Condition';
import Verification from '@/screens/SettingScreens/TwoStepVerification/Verification';
import TwoStepVerification from '@/screens/SettingScreens/TwoStepVerificationc';
import SetLocationScreen from '@/screens/SignUp/SetLocationScreen';
import { isIOS } from '@/Utils/Constant';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';

const Stack = createNativeStackNavigator();
function SettingScreenStack({ route }) {
  useEffect(() => {
    setTimeout(
      () => {
        route.params.setShowTabBar(false);
      },
      isIOS ? 600 : 0,
    );
    return () => {
      route.params.setShowTabBar(true);
    };
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        component={SettingScreen}
        name={NAVIGATION.setting_screen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={BlockedUserScreen}
        name={NAVIGATION.blocked_user_screen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        component={CreatePinScreen}
        name={NAVIGATION.create_pin_Screen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={ChangePassword}
        name={NAVIGATION.change_pw_screen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={SetLocationScreen}
        name={NAVIGATION.set_locaion_screen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={PrivacyPolicy}
        name={NAVIGATION.privacy_policy_screen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={Terms_Condition}
        name={NAVIGATION.terms_condition_screen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={TwoStepVerification}
        name={NAVIGATION.twoStep_Verification_screen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={Verification}
        name={NAVIGATION.verification_screen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default SettingScreenStack;
