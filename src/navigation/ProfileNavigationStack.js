import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { NAVIGATION } from '@/constants/navigation';

import ProfileScreen from '@/screens/PrfileScreen/ProfileScreen';

import FAQScreen from '@/screens/PrfileScreen/FAQScreen';
import ReportAppScreen from '@/screens/PrfileScreen/ReportAppScreen';
import SettingScreenStack from './SettingScreenStack';
import EditProfileScreen from '@/screens/PrfileScreen/EditProfileScreen';
import EditInfo from '@/screens/PrfileScreen/EditInfo';
import { useNavigation } from '@react-navigation/native';
import { Login } from '@/screens/Login/Login';

const Stack = createNativeStackNavigator();

export function ProfileNavigationStack(props) {
  const [showTabBar, setShowTabBar] = useState(true);
  useEffect(() => {
    props.navigation.setOptions({
      tabBarStyle: { display: showTabBar ? 'flex' : 'none' },
    });
  }, [showTabBar, props.navigation]);
  var navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={ProfileScreen}
        initialParams={{
          setShowTabBar: setShowTabBar,
          setLogout: () => {
            // navigation.dispatch(
            //   NavigationActions.navigate({routeName: NAVIGATION.landing}),
            // );
            // alert('dd');
            // props.navigation.popToTop();
            // navigation.navigate(NAVIGATION.home)
          },
        }}
        name={NAVIGATION.profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={SettingScreenStack}
        initialParams={{
          setShowTabBar: setShowTabBar,
        }}
        name={NAVIGATION.setting_screen_stack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={FAQScreen}
        initialParams={{
          setShowTabBar: setShowTabBar,
        }}
        name={NAVIGATION.FAQ_screen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={ReportAppScreen}
        initialParams={{
          setShowTabBar: setShowTabBar,
        }}
        name={NAVIGATION.ReportApp_screen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={EditProfileScreen}
        name={NAVIGATION.edit_profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={EditInfo}
        name={NAVIGATION.edit_information}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        component={Login}
        name={NAVIGATION.login}
        options={{ headerShown: false }}
      /> */}
      {/* <Stack.Screen
        component={BasicInfo}
        name={NAVIGATION.person_basic_info}
        options={{headerShown: false}}
      /> */}
    </Stack.Navigator>
  );
}
