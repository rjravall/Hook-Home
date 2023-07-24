import { COLOR } from '@/theme/theme';
import { fontFamily, fontSize } from '@/Utils/Constant';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from 'react-native';

function OptionQuestionnair({ flag = false, text, onPress, icon }) {
  const { colors } = useTheme();

  React.useEffect(() => {
    // if (showIcon) {
    //   alert('hello');
    // }
  }, []);

  function getBorderColor(flag) {
    return flag ? colors.primary : COLOR.GRAY_500;
  }

  function getBgColor(flag) {
    return flag ? COLOR.PINK_LIGHT : 'white';
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{ flexDirection: 'row', marginRight: 8, marginTop: 8 }}>
        <View
          style={{
            borderColor: getBorderColor(flag),
            backgroundColor: getBgColor(flag),
            borderRadius: 20,
            borderWidth: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}>
          {icon && (
            <Image
              source={{ uri: icon }}
              style={{
                width: 16,
                height: 15.16,
                marginRight: 10,
              }}
            />
            // tintColor: flag ? colors.primary : COLOR.BLACK90,

          )}
          <Text style={{ color: flag ? getBorderColor(flag) : COLOR.GRAY_800 }}>{text}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  text_option: {
    fontSize: fontSize.xlarge,
    fontFamily: fontFamily.SemiBold,
    color: COLOR.BLACK90,
  },
});
export default OptionQuestionnair;
