import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLOR } from '@/theme/theme';
import { fontFamily } from '@/Utils/Constant';

export function Button({
  shadow = true,
  style,
  customTextColor,
  title,
  onPress,
  flag = false,
  index,
  img,
  ...rest
}) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    button: {
      height: 52,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
      backgroundColor: 'white',
      elevation: !shadow ? 0 : 25,
      shadowColor: '#E8415D',
      shadowOpacity: !shadow ? 0 : 0.4,
      shadowRadius: 15,
      shadowOffset: { width: 0, height: 20 },
    },
    text: {
      fontFamily: fontFamily.SemiBold,
      color: colors.text,
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

  function getButtonTextColor(flag) {
    return flag
      ? { color: 'white' }
      : index
        ? { color: COLOR.PRIMARY }
        : { color: COLOR.BLACK90 };
  }

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      {...rest}>
      {flag && (
        <LinearGradient
          colors={['#E6256F', '#E94D56']}
          style={styles.linearGradient}
          angle={90.39}
          useAngle={true}
        />
      )}
      {!flag && (
        <LinearGradient
          colors={['#FFFFFF', '#FFFFFF']}
          style={styles.linearGradient}
          angle={90.39}
          useAngle={true}
        />
      )}
      <Image source={img} />
      <Text style={[styles.text, getButtonTextColor(flag), customTextColor]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
