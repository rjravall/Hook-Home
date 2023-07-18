import { BackIcon } from '@/assets';
import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

function BackButton({ style, ...rest }) {
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: 'red',
          height: 52,
          width: 52,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 12,
          backgroundColor: 'white',
          marginRight: 12,
          elevation: 20,
        },
        style,
      ]}
      {...rest}>
      <Image source={BackIcon} style={{ height: 16, width: 16 }} />
    </TouchableOpacity>
  );
}

export default BackButton;
