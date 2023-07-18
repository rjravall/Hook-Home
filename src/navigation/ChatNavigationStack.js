import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { NAVIGATION } from '@/constants/navigation';

import ChatScreen from '@/screens/ChatScreen/ChatScreen';
import ConversationScreen from '@/screens/ChatScreen/ConversationScreen';

const Stack = createNativeStackNavigator();

export function ChatNavigationStack(props) {
  const [showTabBar, setShowTabBar] = useState(true);
  useEffect(() => {
    props.navigation.setOptions({
      tabBarStyle: { display: showTabBar ? 'flex' : 'none' },
    });
  }, [showTabBar, props.navigation]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        component={ChatScreen}
        name={NAVIGATION.chat_screen}
        initialParams={{ setShowTabBar: setShowTabBar }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={ConversationScreen}
        name={NAVIGATION.coversation_screen}
        initialParams={{ setShowTabBar: setShowTabBar }}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
