import { COLOR } from '@/theme/theme';
import { fontFamily } from '@/Utils/Constant';
import { useTheme } from '@react-navigation/native';

import React from 'react';
import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function WhiteButton({
  textstyle,
  onPress,
  viewStyle,
  title,
  icon,
  activeStyle,
  flag = false,
  ...rest
}) {
  const styles = StyleSheet.create({
    button: {
      height: 52,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
      borderColor: flag ? 'transparent' : COLOR.PRIMARY,
      borderWidth: 1.5,
    },
    text: {
      fontSize: 16,
      fontFamily: fontFamily.SemiBold,
      color: flag ? 'white' : COLOR.PRIMARY,
      marginStart: 8,
    },
    linearGradient: {
      position: 'absolute',
      opacity: 1.0,
      alignItems: 'center',
      justifyContent: 'center',
      height: 52,
      width: '100%',
      borderRadius: 12,
    },
  });
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, viewStyle]}
      {...rest}>
      {flag && (
        <LinearGradient
          colors={['#E6256F', '#E94D56']}
          style={[styles.linearGradient, activeStyle]}
          angle={90.39}
          useAngle={true}
        />
      )}
      {icon && (
        <Image
          style={{ width: 20, height: 20 }}
          resizeMode={'contain'}
          source={icon}
        />
      )}
      <Text style={[styles.text, textstyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

export default WhiteButton;
