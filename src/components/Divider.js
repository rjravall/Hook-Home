import { COLOR } from '@/theme/theme';
import React from 'react';
import { View } from 'react-native';

function Divider({ divider_style }) {
  return (
    <View
      style={[
        {
          width: '100%',
          height: 1,
          backgroundColor: COLOR.WHITE_10,
        },
        divider_style,
      ]}
    />
  );
}

export default Divider;
