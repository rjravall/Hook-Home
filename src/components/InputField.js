import { Input } from 'native-base';
import React from 'react';
import { View, Text } from 'react-native';

function InputField({ placeholder, titleInputField }) {
  return (
    <View>
      {titleInputField && <Text>First Name</Text>}
      <Input variant="underlined" placeholder={placeholder} />
    </View>
  );
}

export default InputField;
