import { COLOR } from '@/theme/theme';
import React, { useState } from 'react';
import { View, Switch, StyleSheet } from 'react-native';

function CustomSwitch({ containerStyle, onChange, isOn }) {
  const [isEnabled, setIsEnabled] = useState(isOn);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={[containerStyle]}>
      <Switch
        trackColor={{ false: COLOR.GRAY_500, true: COLOR.PRIMARY }}
        thumbColor={'white'}
        ios_backgroundColor={COLOR.GRAY_500}
        onValueChange={() => {
          toggleSwitch();
          onChange(!isEnabled);
        }}
        value={isEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomSwitch;
