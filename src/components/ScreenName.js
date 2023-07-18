import { BackIcon } from '@/assets';
import CommonStyle from '@/theme/CommonStyle';
import React from 'react';
import { Image, TouchableWithoutFeedback, View } from 'react-native';
import Title from './Title';

function ScreenName({ name, onBackPress, imagestyle, mtop }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 44,
        paddingHorizontal: 16,
        marginTop: mtop
      }}>
      {onBackPress && (
        <TouchableWithoutFeedback onPress={onBackPress}>
          <Image
            source={BackIcon}
            style={[{ height: 16, width: 16 }, imagestyle]}
            resizeMode="contain"
          />
        </TouchableWithoutFeedback>
      )}
      <View style={{ flex: 1 }}>
        <Title title={name} style={{ alignSelf: 'center' }} />
      </View>
    </View>
  );
}

export default ScreenName;
