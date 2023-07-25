import { COLOR } from '@/theme/theme';
import { fontFamily } from '@/Utils/Constant';

import React from 'react';
import { View } from 'react-native';
import { TextInput, } from 'react-native-paper';

function TextInputField({ text, setText, keyboardType, extraStyle, placeholderTextColor, placeholder = '', editable = true, ...rest }) {
  return (
    <View style={[extraStyle]}>
      <TextInput
        activeUnderlineColor={COLOR.PRIMARY}
        fontFamily={fontFamily.Regular}
        theme={{
          fonts: fontFamily.SemiBold, colors: {
            primary: placeholderTextColor, // Change this to the desired label color
          },
        }}
        textColor={COLOR.BLACK80}

        keyboardType={keyboardType}
        style={{
          backgroundColor: 'transparent',
          width: '100%',
          paddingHorizontal: 0,
          textAlignVertical: 'center',

        }}
        placeholderTextColor={placeholderTextColor}
        placeholder={placeholder}
        label={placeholder}
        value={text}
        editable={editable}
        onChangeText={text => setText(text)}
        {...rest}
      />
    </View>
  );
}
export default TextInputField;
