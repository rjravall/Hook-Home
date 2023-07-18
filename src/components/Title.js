import { COLOR } from '@/theme/theme';
import { fontFamily, fontSize } from '@/Utils/Constant';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  title: {
    fontSize: fontSize.xlarge,
    fontFamily: fontFamily.SemiBold,
    color: COLOR.BLACK90,
  },
});
function Title({ title, style, touchableStyle, onPress, ...rest }) {
  return (
    <TouchableWithoutFeedback onPress={onPress} style={touchableStyle}>
      <Text style={[styles.title, style]} {...rest}>
        {title}
      </Text>
    </TouchableWithoutFeedback>
  );
}

export default Title;
