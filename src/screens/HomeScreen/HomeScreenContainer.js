import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Tabs from './Tabs';

function HomeScreenContainer(props) {
  // function renderOnTop(element) {
  //   return element;
  // }

  return (
    <NavigationContainer independent={true}>
      <Tabs props={{ data: 'test' }} />
    </NavigationContainer>
  );
}

export default HomeScreenContainer;
