import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useColorScheme } from 'react-native';
import { AppNavigator } from '@/navigation/AppNavigator';
import { theme } from '@/theme';

export function RootNavigator() {
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={theme[scheme]}>
      <AppNavigator />
    </NavigationContainer>
  );
}
