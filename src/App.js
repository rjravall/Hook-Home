import React from 'react';
import Geocoder from 'react-native-geocoding';

import { RootNavigator } from './navigation';
import { API_KEY } from './screens/SignUp/Map/API_KEY';

const App = () => {
  // Geocoder.init(API_KEY);
  return <RootNavigator />;
};

export default App;
