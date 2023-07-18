import { RightIcon } from '@/assets';
import { COLOR } from '@/theme/theme';
import { fontFamily, fontSize } from '@/Utils/Constant';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native';

function PersonalInfoItem({ onPress, title, value, flag = true }) {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          marginTop: 16,
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
        }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              flex: 1,
              fontFamily: fontFamily.Regular,
              fontSize: fontSize.medium,
              color: COLOR.BLACK80,
            }}>
            {title}
          </Text>
          <Text
            style={{
              flex: 1,
              marginTop: 2,
              fontFamily: fontFamily.Regular,
              fontSize: fontSize.medium,
              color: COLOR.GRAY_800,
            }}>
            {value}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              marginEnd: 8,
              fontFamily: fontFamily.Regular,
              fontSize: fontSize.xmedium,
              color: flag ? COLOR.PRIMARY : COLOR.GRAY_800,
            }}>
            {flag ? 'Visible' : 'Hidden'}
          </Text>
          <Image
            source={RightIcon}
            style={{ height: 16, width: 16 }}
            resizeMode={'contain'}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default PersonalInfoItem;
