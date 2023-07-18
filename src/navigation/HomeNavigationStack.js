import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { NAVIGATION } from '@/constants/navigation';

import BasicInfo from '@/screens/PersonalDetail/PersonPersonalInfo';
import HomeScreen from '@/screens/HomeScreen/HomeScreen';
import DetailScreen from '@/screens/PersonalDetail/DetailScreen';
import Matched from '@/screens/HomeScreen/Matched';

const Stack = createNativeStackNavigator();

export function HomeNavigationStack(props) {
  const [showTabBar, setShowTabBar] = useState(true);
  useEffect(() => {
    props.navigation.setOptions({
      tabBarStyle: { display: showTabBar ? 'flex' : 'none' },
    });
  }, [showTabBar, props.navigation]);

  return (
    <Stack.Navigator initialRouteName={NAVIGATION.home}
    >
      <Stack.Screen
        component={HomeScreen}
        name={NAVIGATION.home}
        initialParams={{ setShowTabBar: setShowTabBar }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={BasicInfo}
        name={NAVIGATION.person_basic_info}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={DetailScreen}
        name={NAVIGATION.person_details}
        initialParams={{ setShowTabBar: setShowTabBar }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={Matched}
        name={NAVIGATION.matched}
        initialParams={{ setShowTabBar: setShowTabBar }}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
