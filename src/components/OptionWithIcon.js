import { fontFamily, fontSize } from '@/Utils/Constant';
import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import Title from './Title';
import { COLOR } from '@/theme/theme';
import { RightIcon } from '@/assets';
import CustomSwitch from './Switch';
import { Text } from 'react-native';
function OptionWithIcon({
  link,
  icon,
  title,
  value,
  switch_flag = null,
  onChangeswitch,
  onPress,
  titleStyle,
}) {
  const [logout, SetLogout] = useState();
  React.useEffect(() => {
    if (title == 'Logout') {
      SetLogout(true);
    }
  }, []);
  return (
    <TouchableWithoutFeedback
      onPress={link ? () => Linking.openURL(link) : onPress}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          flex: 1,
        }}>
        {icon && (
          <Image
            source={icon}
            style={{
              height: 18,
              width: 18,
              tintColor: logout ? COLOR.PRIMARY : '',
            }}
            resizeMode="contain"
          />
        )}
        <Text
          style={[
            styles.title_style,
            titleStyle,
            { color: logout ? COLOR.PRIMARY : COLOR.GRAY_800 },
          ]}>
          {title}
        </Text>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',

            justifyContent: 'flex-end',
          }}>
          {value && (
            <Title
              title={value}
              touchableStyle={{ marginEnd: 8 }}
              style={{
                fontFamily: fontFamily.Regular,
                fontSize: fontSize.medium,
                color: COLOR.GRAY_800,
                alignSelf: 'flex-end',
              }}
            />
          )}
          {!logout && (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              {!switch_flag && title !== 'Show Preview' && (
                <Image
                  source={RightIcon}
                  style={{
                    height: 16,
                    width: 16,
                  }}
                  resizeMode="contain"
                />
              )}
              {switch_flag && (
                <CustomSwitch
                  onChange={isOn => {
                    onChangeswitch(isOn);
                  }}
                  isOn={switch_flag}
                />
              )}
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  title_style: {
    fontFamily: fontFamily.Medium,
    fontSize: fontSize.medium,
    marginStart: 8,
  },
});
export default OptionWithIcon;
