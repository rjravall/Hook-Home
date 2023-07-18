import {
  ChatFillIcon,
  ChatIcon,
  HomeBottomIcon,
  HomeFilledBottomIcon,
  NavigationFillIcon,
  NavigationIcon,
  NotificationFillIcon,
  NotificationIcon,
  ProfileFillIcon,
  ProfileIcon,
} from '@/assets';
import { ChatNavigationStack } from '@/navigation/ChatNavigationStack';
import { HomeNavigationStack } from '@/navigation/HomeNavigationStack';
import { ProfileNavigationStack } from '@/navigation/ProfileNavigationStack';
import { COLOR } from '@/theme/theme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import ExploreScreen from '../ExploreScreen/ExploreScreen';
import NotificationScreen from '../NotificationScreen/NotificationScreen';


const Tab = createBottomTabNavigator();
function Tabs(props) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    bottom_icon: { width: 20, height: 20 },
  });
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let icon_color = focused ? null : COLOR.GRAY_BORDER;

          switch (route.name) {
            case 'home':
              return (
                <Image
                  style={[styles.bottom_icon, icon_color]}
                  tintColor={icon_color}
                  source={focused ? HomeFilledBottomIcon : HomeBottomIcon}
                />
              );
            case 'navigation':
              return (
                <Image
                  source={focused ? NavigationFillIcon : NavigationIcon}
                  style={[styles.bottom_icon]}
                  tintColor={icon_color}
                />
              );
            case 'chat':
              return (
                <Image
                  source={focused ? ChatFillIcon : ChatIcon}
                  style={[styles.bottom_icon, icon_color]}
                  tintColor={icon_color}
                />
              );
            case 'notification':
              return (
                <Image
                  source={focused ? NotificationFillIcon : NotificationIcon}
                  style={[styles.bottom_icon, icon_color]}
                  tintColor={icon_color}
                />
              );
            case 'profile':
              return (
                <Image
                  source={focused ? ProfileFillIcon : ProfileIcon}
                  style={[styles.bottom_icon, icon_color]}
                  tintColor={icon_color}
                />
              );
          }
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="home" component={HomeNavigationStack} />
      <Tab.Screen name="navigation" component={ExploreScreen} />
      <Tab.Screen name="chat" component={ChatNavigationStack} />
      <Tab.Screen name="notification" component={NotificationScreen} />
      <Tab.Screen name="profile" component={ProfileNavigationStack} />


      {/* <Tab.Screen name="setting" component={SettingScreen} /> */}
      {/* <Tab.Screen name="profile" component={ProfileScreen} />
      <Tab.Screen name="profile" component={ProfileScreen} /> */}
    </Tab.Navigator>
  );
}

export default Tabs;
