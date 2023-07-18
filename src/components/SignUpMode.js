import { ModeSelectIcon, ModeUnSelectIcon } from '@/assets';
import { COLOR } from '@/theme/theme';
import { fontFamily, fontSize } from '@/Utils/Constant';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import Title from './Title';

function SignUpMode({ data, flag = false, onPress }) {
  const { colors } = useTheme();

  function getBorderColor(flag) {
    return flag ? COLOR.PRIMARY : COLOR.GRAY_500;
  }
  const styles = StyleSheet.create({
    dating_mode_container: {
      marginTop: 16,
      backgroundColor: 'white',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderRadius: 20,
      borderWidth: 1.5,
      borderColor: getBorderColor(flag),
    },
    subtitle_text: {
      fontFamily: fontFamily.Regular,
      fontSize: fontSize.xmedium,
      color: COLOR.GRAY_800,
    },
  });
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.dating_mode_container}>
        <Image source={{ uri: data.icon }} style={{ height: 44, width: 44 }} />
        <View style={{ backgroundColor: 'white', marginStart: 10 }}>
          <Title title={data.title} style={{ fontSize: fontSize.large }} />
          <Title title={data.description} style={styles.subtitle_text} />
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Image
            source={flag ? ModeSelectIcon : ModeUnSelectIcon}
            style={{
              height: 20,
              width: 20,
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default SignUpMode;
